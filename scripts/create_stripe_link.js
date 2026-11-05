import 'dotenv/config';

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_KEY) {
  console.error("STRIPE_SECRET_KEY não encontrado no .env");
  process.exit(1);
}

async function stripeRequest(endpoint, method = 'GET', data = null) {
  const url = `https://api.stripe.com/v1${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${STRIPE_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  if (data && method !== 'GET') {
    const params = new URLSearchParams();
    function appendData(prefix, val) {
      if (val === null || val === undefined) return;
      if (typeof val === 'object' && !Array.isArray(val)) {
        for (const [k, v] of Object.entries(val)) {
          appendData(`${prefix}[${k}]`, v);
        }
      } else if (Array.isArray(val)) {
        val.forEach((item, index) => {
          appendData(`${prefix}[${index}]`, item);
        });
      } else {
        params.append(prefix, val.toString());
      }
    }
    for (const [k, v] of Object.entries(data)) {
      appendData(k, v);
    }
    options.body = params.toString();
  }

  const res = await fetch(url, options);
  const json = await res.json();
  return { ok: res.ok, status: res.status, data: json };
}

const PRODUCTS_CONFIG = [
  {
    name: "Kit Líder de Encontros",
    description: "Kit completo com mais de 70 dinâmicas, temas, roteiros de retiro e modelos pastorais.",
    price: 3700, // R$ 37,00
    isMain: true
  },
  {
    name: "Devocional Guiado de 30 Dias",
    description: "Roteiro devocional diário para liderança e fortalecimento espiritual.",
    price: 1490, // R$ 14,90
    isMain: false
  },
  {
    name: "Pack de 50 Artes no Canva",
    description: "Templates 100% editáveis no Canva para encontros de jovens, retiros e cultos.",
    price: 1990, // R$ 19,90
    isMain: false
  }
];

async function getOrCreateProduct(prodConfig) {
  // 1. Procurar produto existente
  const listRes = await stripeRequest('/products?limit=100');
  if (!listRes.ok) {
    throw new Error(`Erro ao listar produtos: ${JSON.stringify(listRes.data)}`);
  }

  let product = listRes.data.data.find(p => p.name.trim().toLowerCase() === prodConfig.name.trim().toLowerCase());

  if (!product) {
    console.log(`Criando produto: ${prodConfig.name}...`);
    const createRes = await stripeRequest('/products', 'POST', {
      name: prodConfig.name,
      description: prodConfig.description,
    });
    if (!createRes.ok) {
      throw new Error(`Erro ao criar produto ${prodConfig.name}: ${JSON.stringify(createRes.data)}`);
    }
    product = createRes.data;
    console.log(`✅ Produto criado com sucesso: [${product.id}] ${product.name}`);
  } else {
    console.log(`ℹ️ Produto já existente: [${product.id}] ${product.name}`);
  }

  // 2. Procurar ou criar preço em BRL
  const pricesRes = await stripeRequest(`/prices?product=${product.id}&limit=20`);
  if (!pricesRes.ok) {
    throw new Error(`Erro ao listar preços para ${product.id}: ${JSON.stringify(pricesRes.data)}`);
  }

  let price = pricesRes.data.data.find(pr => pr.currency === 'brl' && pr.unit_amount === prodConfig.price && pr.active);

  if (!price) {
    console.log(`Criando preço de R$ ${(prodConfig.price / 100).toFixed(2)} para ${prodConfig.name}...`);
    const createPriceRes = await stripeRequest('/prices', 'POST', {
      product: product.id,
      unit_amount: prodConfig.price,
      currency: 'brl',
    });
    if (!createPriceRes.ok) {
      throw new Error(`Erro ao criar preço: ${JSON.stringify(createPriceRes.data)}`);
    }
    price = createPriceRes.data;
    console.log(`✅ Preço criado com sucesso: [${price.id}] R$ ${(price.unit_amount / 100).toFixed(2)}`);
  } else {
    console.log(`ℹ️ Preço já existente: [${price.id}] R$ ${(price.unit_amount / 100).toFixed(2)}`);
  }

  return { product, price, isMain: prodConfig.isMain };
}

async function main() {
  console.log("=== INICIANDO INTEGRAÇÃO STRIPE ===");

  const resolved = [];
  for (const config of PRODUCTS_CONFIG) {
    const res = await getOrCreateProduct(config);
    resolved.push(res);
  }

  const mainItem = resolved.find(r => r.isMain);
  const bumpItems = resolved.filter(r => !r.isMain);

  console.log("\nCriando Payment Link...");

  const payload = {
    line_items: [
      {
        price: mainItem.price.id,
        quantity: 1
      }
    ],
    optional_items: bumpItems.map(item => ({
      price: item.price.id,
      quantity: 1
    })),
    after_completion: {
      type: "redirect",
      redirect: {
        url: "https://kit-pastoral.codhun.workers.dev?status=success"
      }
    }
  };

  const linkRes = await stripeRequest('/payment_links', 'POST', payload);
  if (!linkRes.ok) {
    console.error("Erro ao criar Payment Link:", JSON.stringify(linkRes.data, null, 2));
    process.exit(1);
  }

  const paymentLinkUrl = linkRes.data.url;
  console.log("\n=======================================================");
  console.log("🎉 PAYMENT LINK CRIADO COM SUCESSO!");
  console.log(`URL: ${paymentLinkUrl}`);
  console.log("=======================================================\n");

  return paymentLinkUrl;
}

main().catch(err => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
