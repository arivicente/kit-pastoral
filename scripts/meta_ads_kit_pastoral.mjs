import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TOKEN = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';
const AD_ACCOUNT_ID = 'act_898705452000785';
const PAGE_ID = '1411397938722584';
const PIXEL_ID = '7862991820414968';
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
    throw new Error(`[Meta API Error] ${data.error.message} (Code ${data.error.code}, Subcode ${data.error.error_subcode || 'none'})`);
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
    throw new Error(`Erro upload imagem: ${data.error.message}`);
  }
  const hash = data.images[Object.keys(data.images)[0]].hash;
  console.log(`✅ Upload imagem ${path.basename(filePath)} concluído! Hash: ${hash}`);
  return hash;
}

async function run() {
  console.log('🚀 === MERCÚRIO: CRIAÇÃO AUTÔNOMA DE CAMPANHA META ADS ===\n');

  // 1. Upload dos 3 criativos 4:5
  console.log('[Passo 1/4] Fazendo upload dos 3 criativos 4:5...');
  const ad1Path = path.join(__dirname, '..', 'public', 'anuncios', 'ad_01_comparativo_4x5.png');
  const ad2Path = path.join(__dirname, '..', 'public', 'anuncios', 'ad_02_dinamica_revelada_4x5.png');
  const ad3Path = path.join(__dirname, '..', 'public', 'anuncios', 'ad_03_acervo_completo_4x5.png');

  const hash1 = await uploadImage(ad1Path);
  const hash2 = await uploadImage(ad2Path);
  const hash3 = await uploadImage(ad3Path);

  // 2. Criação da Campanha (PAUSADA)
  console.log('\n[Passo 2/4] Verificando / Criando Campanha (Status: PAUSED)...');
  const campaignName = '[Kit Pastoral] 01. Validação Direct Response';
  
  const existingCamp = await api(`/${AD_ACCOUNT_ID}/campaigns?fields=id,name`);
  let campaignId = existingCamp.data?.find(c => c.name === campaignName)?.id;

  if (!campaignId) {
    const newCamp = await api(`/${AD_ACCOUNT_ID}/campaigns`, 'POST', {
      name: campaignName,
      objective: 'OUTCOME_TRAFFIC',
      status: 'PAUSED',
      special_ad_categories: [],
      is_adset_budget_sharing_enabled: false
    });
    campaignId = newCamp.id;
    console.log(`✅ Campanha criada! ID: ${campaignId}`);
  } else {
    console.log(`ℹ️ Campanha já existente encontrada! ID: ${campaignId}`);
  }

  // 3. Criação do Conjunto de Anúncios (AdSet)
  console.log('\n[Passo 3/4] Criando Conjunto de Anúncios (AdSet)...');
  const adSetName = '01. Brasil - Pastores, Pregadores & Líderes (25-65a)';
  const existingAdSets = await api(`/${AD_ACCOUNT_ID}/adsets?fields=id,name`);
  let adSetId = existingAdSets.data?.find(a => a.name === adSetName)?.id;

  if (!adSetId) {
    const targeting = {
      geo_locations: {
        countries: ['BR']
      },
      age_min: 25,
      age_max: 65,
      publisher_platforms: ['facebook', 'instagram', 'audience_network', 'messenger']
    };

    const newAdSet = await api(`/${AD_ACCOUNT_ID}/adsets`, 'POST', {
      name: adSetName,
      campaign_id: campaignId,
      daily_budget: 3000, // R$ 30,00/dia
      billing_event: 'IMPRESSIONS',
      optimization_goal: 'LINK_CLICKS',
      bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
      targeting,
      status: 'PAUSED'
    });
    adSetId = newAdSet.id;
    console.log(`✅ AdSet criado! ID: ${adSetId}`);
  } else {
    console.log(`ℹ️ AdSet já existente encontrado! ID: ${adSetId}`);
  }

  // 4. Criação dos 3 Criativos e Anúncios
  console.log('\n[Passo 4/4] Criando os 3 Criativos e Anúncios...');
  const adsData = [
    {
      hash: hash1,
      name: 'Anúncio 01 - Comparativo Antes vs Depois (6 Horas)',
      headline: 'Prepare Sermões Profundos em 15 Minutos',
      body: 'Cansado de passar horas e noites tentando estruturar esboços de mensagens? Tenha em mãos mais de 100 esboços exegéticos e 70 dinâmicas prontas em PDF para celular ou impressão.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    },
    {
      hash: hash2,
      name: 'Anúncio 02 - Dinâmicas Reveladas para Jovens e Retiros',
      headline: 'A Dinâmica Bíblica que Mantém Todos Atentos',
      body: 'Elimine o improviso e o desinteresse nos encontros. O acervo completo traz roteiros de dinâmicas com moral espiritual profunda, quebra-gelos e temas de retiros prontos para aplicar.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    },
    {
      hash: hash3,
      name: 'Anúncio 03 - Acervo Pastoral Completo 2026 (R$ 37)',
      headline: 'Acervo Pastoral Completo 2026 em PDF',
      body: 'Acesso vitalício imediato a mais de 300 recursos: 100 esboços, 70 dinâmicas, 4 bônus exclusivos. Baixe no celular agora por apenas R$ 37,00 via Pix ou Cartão.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    }
  ];

  for (const item of adsData) {
    // AdCreative
    const creativeName = `Criativo - ${item.name}`;
    const existingCreatives = await api(`/${AD_ACCOUNT_ID}/adcreatives?fields=id,name`);
    let creativeId = existingCreatives.data?.find(c => c.name === creativeName)?.id;

    if (!creativeId) {
      const objectStorySpec = {
        page_id: PAGE_ID,
        link_data: {
          link: item.link,
          message: item.body,
          name: item.headline,
          description: 'Acesso Imediato no Celular • Garantia de 7 Dias',
          image_hash: item.hash,
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
      creativeId = newCreative.id;
      console.log(`✅ Criativo registrado: [${creativeId}] ${creativeName}`);
    } else {
      console.log(`ℹ️ Criativo já existente: [${creativeId}] ${creativeName}`);
    }

    // Ad
    const existingAds = await api(`/${AD_ACCOUNT_ID}/ads?fields=id,name,adset_id`);
    let adId = existingAds.data?.find(a => a.name === item.name && a.adset_id === adSetId)?.id;

    if (!adId) {
      const newAd = await api(`/${AD_ACCOUNT_ID}/ads`, 'POST', {
        name: item.name,
        adset_id: adSetId,
        creative: { creative_id: creativeId },
        status: 'PAUSED'
      });
      adId = newAd.id;
      console.log(`🎉 Anúncio criado: [${adId}] ${item.name}`);
    } else {
      console.log(`ℹ️ Anúncio já existente: [${adId}] ${item.name}`);
    }
  }

  console.log('\n✨ ========================================================');
  console.log('ESTRUTURA COMPLETA DE TRÁFEGO DO KIT PASTORAL CRIADA COM SUCESSO!');
  console.log(`- Campanha ID: ${campaignId}`);
  console.log(`- AdSet ID:    ${adSetId}`);
  console.log(`- Pixel:       ${PIXEL_ID} (Kit Pastoral - Pixel Oficial)`);
  console.log(`- Status:      PAUSED (Rascunho seguro para sua revisão no Gerenciador)`);
  console.log('========================================================\n');
}

run().catch(err => {
  console.error('\n❌ Erro durante a execução:', err.message);
  process.exit(1);
});
