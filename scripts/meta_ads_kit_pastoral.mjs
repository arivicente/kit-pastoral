import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TOKEN = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';
const AD_ACCOUNT_ID = 'act_898705452000785';
const PAGE_ID = '1499768259876658'; // Acervo Digital Oficial (NOVA PÁGINA GENÉRICA!)
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
  console.log('🚀 === ATUALIZANDO META ADS COM PÁGINA "ACERVO DIGITAL" E CRIATIVOS DAVINCI V2 ===\n');

  // 1. Upload dos novos 3 criativos 4:5
  console.log('[Passo 1/3] Fazendo upload das novas artes remasterizadas...');
  const ad1Path = path.join(__dirname, '..', 'public', 'anuncios', 'ad_01_comparativo_4x5.png');
  const ad2Path = path.join(__dirname, '..', 'public', 'anuncios', 'ad_02_dinamica_revelada_4x5.png');
  const ad3Path = path.join(__dirname, '..', 'public', 'anuncios', 'ad_03_acervo_completo_4x5.png');

  const hash1 = await uploadImage(ad1Path);
  const hash2 = await uploadImage(ad2Path);
  const hash3 = await uploadImage(ad3Path);

  // 2. Busca campanha e adset existentes
  const camps = await api(`/${AD_ACCOUNT_ID}/campaigns?fields=id,name`);
  const campaignId = camps.data?.find(c => c.name.includes('[Kit Pastoral]'))?.id;
  const adsets = await api(`/${AD_ACCOUNT_ID}/adsets?fields=id,name,campaign_id`);
  const adSetId = adsets.data?.find(a => a.campaign_id === campaignId)?.id;

  console.log(`\nCampanha vinculada: ${campaignId}`);
  console.log(`AdSet vinculado:    ${adSetId}`);

  // 3. Criação dos 3 Novos Criativos Vinculados à Página Acervo Digital (1499768259876658)
  console.log(`\n[Passo 2/3] Vinculando à nova Página Oficial: Acervo Digital (ID: ${PAGE_ID})...`);

  const adsData = [
    {
      hash: hash1,
      name: 'Anúncio 01 - Comparativo Antes vs Depois (Remaster DaVinci)',
      headline: 'Liderar Encontros Não Precisa Ser um Pesadelo',
      body: 'Cansado de passar horas toda semana caçando dinâmicas na internet? Tenha em mãos mais de 70 dinâmicas aplicadas e 100 esboços bíblicos prontos para celular ou impressão.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    },
    {
      hash: hash2,
      name: 'Anúncio 02 - Dinâmica Revelada Ponte de Papel (Remaster DaVinci)',
      headline: 'A Dinâmica da Ponte de Confiança (Pronta)',
      body: 'Elimine o improviso e o desinteresse nos encontros. Veja a dinâmica completa da Ponte de Confiança com versículo e perguntas de reflexão prontas no acervo.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    },
    {
      hash: hash3,
      name: 'Anúncio 03 - Acervo Completo em Módulos (Remaster DaVinci)',
      headline: 'Acervo Pastoral Completo 2026 em PDF',
      body: 'Mais de 300 recursos: 35 quebra-gelos, 25 roteiros atuais, 44 roteiros de retiros, 28 desafios WhatsApp e 100 versículos temáticos. Apenas R$ 37,00 com acesso vitalício.',
      link: 'https://kit-pastoral.codhun.workers.dev'
    }
  ];

  for (const item of adsData) {
    const creativeName = `Criativo v2 - ${item.name}`;
    const objectStorySpec = {
      page_id: PAGE_ID,
      link_data: {
        link: item.link,
        message: item.body,
        name: item.headline,
        description: 'Página Oficial • Acesso Imediato no Celular ou PC',
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
    console.log(`✅ Novo Criativo v2 registrado: [${newCreative.id}] ${creativeName}`);

    // Cria o anúncio com o novo criativo na nova página
    const newAd = await api(`/${AD_ACCOUNT_ID}/ads`, 'POST', {
      name: item.name,
      adset_id: adSetId,
      creative: { creative_id: newCreative.id },
      status: 'PAUSED'
    });
    console.log(`🎉 Anúncio v2 criado com sucesso: [${newAd.id}] ${item.name}`);
  }

  console.log('\n✨ ========================================================');
  console.log('ESTRUTURA ATUALIZADA COM SUCESSO!');
  console.log(`- Página Anunciante: Acervo Digital (ID: ${PAGE_ID})`);
  console.log(`- Criativos: Remasterizados pelo DaVinci com auditoria Atena`);
  console.log(`- Status: PAUSED (Pronto para revisão ou ativação imediata)`);
  console.log('========================================================\n');
}

run().catch(err => {
  console.error('\n❌ Erro durante a execução:', err.message);
  process.exit(1);
});
