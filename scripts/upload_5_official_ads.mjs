import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TOKEN = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';
const AD_ACCOUNT_ID = 'act_898705452000785';
const PAGE_ID = '1499768259876658'; // Acervo Digital Oficial
const GRAPH_API = 'https://graph.facebook.com/v20.0';

async function api(endpoint, method = 'GET', body = null) {
  const url = `${GRAPH_API}${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  };
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const data = await res.json();
  if (data.error) {
    throw new Error(`[Meta API Error] ${data.error.message} (Code ${data.error.code})`);
  }
  return data;
}

// Upload de imagem multipart
async function uploadImage(filePath) {
  const url = `${GRAPH_API}/${AD_ACCOUNT_ID}/adimages`;
  const fileData = fs.readFileSync(filePath);
  const blob = new Blob([fileData], { type: 'image/png' });

  const formData = new FormData();
  formData.append('filename', blob, path.basename(filePath));
  formData.append('access_token', TOKEN);

  const res = await fetch(url, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(`Erro upload imagem ${filePath}: ${data.error.message}`);
  }
  const hash = data.images[Object.keys(data.images)[0]].hash;
  console.log(`✅ Upload imagem [${path.basename(filePath)}] concluído! Hash: ${hash}`);
  return hash;
}

async function run() {
  console.log('🚀 === MERCÚRIO: SUBIDA DOS 5 ANÚNCIOS OFICIAIS MODELADOS NA PÁGINA ACERVO DIGITAL ===\n');

  // Identifica Campanha e AdSet existentes
  const camps = await api(`/${AD_ACCOUNT_ID}/campaigns?fields=id,name`);
  const campaignId = camps.data?.find(c => c.name.includes('[Kit Pastoral]'))?.id;
  const adsets = await api(`/${AD_ACCOUNT_ID}/adsets?fields=id,name,campaign_id`);
  const adSetId = adsets.data?.find(a => a.campaign_id === campaignId)?.id;

  console.log(`📍 Campanha: [${campaignId}]`);
  console.log(`📍 AdSet:    [${adSetId}]`);
  console.log(`📍 Página:   [${PAGE_ID}] Acervo Digital\n`);

  // Definição dos 5 Anúncios
  const adsData = [
    {
      file: 'ad_01_autoridade_acervo_4x5.png',
      name: 'Anúncio 01 - Autoridade & Acervo 3D (Ref. Fonte Viva)',
      headline: '100 Esboços & Dinâmicas para Jovens',
      body: '⚠️ A juventude precisa de mensagens e dinâmicas que realmente impactem.\n\nSe você sente dificuldade para encontrar temas fortes e atuais que conectem os jovens com Deus... esse material vai te ajudar.\n\n📖 São mais de 100 Esboços Bíblicos e 70 Dinâmicas aplicadas prontas em PDF A4 para imprimir e usar.\n\nClique em "Saiba Mais" e tenha acesso vitalício imediato por apenas R$ 37,00.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    },
    {
      file: 'ad_02_caderno_espiral_4x5.png',
      name: 'Anúncio 02 - Caderno Espiral 3D (Ref. Suzana Lima)',
      headline: 'Planejador Anual & Acervo do Líder',
      body: '👀 Olha esse material que todo líder de jovens deveria conhecer!\n\nUm acervo com +70 dinâmicas e roteiros bíblicos com moral espiritual comprovada, quebra-gelos e temas de retiro.\n\nVocê nunca mais precisa ficar pensando: “O que eu vou fazer de diferente nesse sábado?”.\n\nClique em "Saiba Mais" e baixe a apostila completa em PDF por R$ 37.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    },
    {
      file: 'ad_03_comparativo_sexta_4x5.png',
      name: 'Anúncio 03 - Comparativo Sexta-Feira (Dor & Urgência)',
      headline: 'Liderar Jovens Não Precisa Ser um Pesadelo',
      body: 'Chega de passar a sexta-feira até 23h caçando ideias no Google e no YouTube para o encontro de sábado.\n\nCom o Kit Pastoral, você abre a pasta, escolhe o tema e imprime em menos de 5 minutos dinâmicas que mantêm todos os jovens atentos e participativos.\n\nDisponível hoje por apenas R$ 37,00.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    },
    {
      file: 'ad_04_ficha_revelada_4x5.png',
      name: 'Anúncio 04 - Ficha Prática Revelada (Valor Antecipado)',
      headline: 'A Dinâmica da Ponte de Confiança (Pronta)',
      body: '🔥 Dinâmica Revelada #04: A Ponte de Confiança (Baseada em Gálatas 6, 2).\n\nUma atividade simples de 12 minutos que quebra a timidez e ensina apoio mútuo entre os jovens.\n\nEsta é apenas 1 das mais de 70 dinâmicas estruturadas no nosso acervo digital.\n\nClique no botão abaixo para garantir o material completo.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    },
    {
      file: 'ad_05_prova_social_whatsapp_4x5.png',
      name: 'Anúncio 05 - Prova Social WhatsApp (Comunidade de Líderes)',
      headline: 'O Que os Líderes Dizem no WhatsApp',
      body: '⭐ "Pela primeira vez saí do culto com paz de espírito! Até os jovens que viviam no celular participaram da reflexão."\n\nMais de 1.400 líderes de ministério em todo o Brasil já utilizam o Kit Pastoral para transformar seus encontros e retiros.\n\nBaixe no seu celular agora com garantia incondicional de 7 dias.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    }
  ];

  console.log('--- Processando os 5 anúncios ---');
  for (const item of adsData) {
    const fullPath = path.join(__dirname, '..', 'public', 'anuncios', item.file);
    const hash = await uploadImage(fullPath);

    const creativeName = `Criativo Oficial - ${item.name}`;
    const objectStorySpec = {
      page_id: PAGE_ID,
      link_data: {
        link: item.link,
        message: item.body,
        name: item.headline,
        description: 'Acervo Digital Oficial • Download Imediato em PDF',
        image_hash: hash,
        call_to_action: {
          type: 'LEARN_MORE',
          value: { link: item.link }
        }
      }
    };

    const newCreative = await api(`/${AD_ACCOUNT_ID}/adcreatives`, 'POST', {
      name: creativeName,
      object_story_spec: objectStorySpec
    });
    console.log(`✅ Criativo criado: [${newCreative.id}] ${creativeName}`);

    const newAd = await api(`/${AD_ACCOUNT_ID}/ads`, 'POST', {
      name: item.name,
      adset_id: adSetId,
      creative: { creative_id: newCreative.id },
      status: 'PAUSED'
    });
    console.log(`🎉 Anúncio criado na Meta: [${newAd.id}] ${item.name}\n`);
  }

  console.log('✨ ========================================================');
  console.log('TODOS OS 5 ANÚNCIOS OFICIAIS FORAM SUBIDOS COM SUCESSO!');
  console.log(`- Página: Acervo Digital (ID: ${PAGE_ID})`);
  console.log(`- Conta:  ${AD_ACCOUNT_ID}`);
  console.log(`- Status: PAUSED (Prontos para ativar no Gerenciador)`);
  console.log('========================================================\n');
}

run().catch(err => {
  console.error('\n❌ Erro durante a subida dos anúncios:', err.message);
  process.exit(1);
});
