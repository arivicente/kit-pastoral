import { ApifyClient } from 'apify-client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega token do ambiente ou fallback seguro
const APIFY_TOKEN = process.env.APIFY_TOKEN || 'apify_api_hWPXkcQKId7DJDhMPR9iJy1RtwHwhP2SSgpe';

const client = new ApifyClient({
  token: APIFY_TOKEN,
});

async function runAdEspionage() {
  console.log('=====================================================');
  console.log('🕵️‍♂️ INICIANDO ESPIONAGEM NA META ADS LIBRARY VIA APIFY');
  console.log('=====================================================');
  console.log(`🔑 Usando Token: ${APIFY_TOKEN.substring(0, 14)}...`);

  // URLs de busca cirúrgicas para Low Ticket & Infoprodutos no Brasil
  const targetUrls = [
    {
      url: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&q=pay.kiwify.com.br&search_type=keyword_unordered&media_type=all"
    },
    {
      url: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&q=dinamicas%20jovens%20pdf&search_type=keyword_unordered&media_type=all"
    },
    {
      url: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&q=pastoral%20jovens%20apostila&search_type=keyword_unordered&media_type=all"
    }
  ];

  const input = {
    urls: targetUrls,
    count: 30, // Quantidade otimizada para teste rápido e consumo mínimo de créditos
    scrapeAdDetails: false
  };

  try {
    console.log('🚀 Disparando Actor "curious_coder/facebook-ads-library-scraper"...');
    const run = await client.actor("curious_coder/facebook-ads-library-scraper").call(input);
    
    console.log(`📥 Coleta finalizada! ID da Execução: ${run.id}`);
    console.log(`📊 Acessando dataset: ${run.defaultDatasetId}...`);
    
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    console.log(`📦 Coletados ${items.length} anúncios brutos da Meta Ads Library.`);

    const agora = new Date();
    const minerados = [];

    for (const ad of items) {
      const dataInicioRaw = ad.startDate || ad.start_date || ad.ad_delivery_start_time;
      let diasAtivo = 0;
      if (dataInicioRaw) {
        const dataInicio = new Date(dataInicioRaw);
        diasAtivo = Math.floor((agora - dataInicio) / (1000 * 60 * 60 * 24));
      }

      minerados.push({
        pageName: ad.pageName || ad.page_name || 'Anunciante Sem Nome',
        pageId: ad.pageId || ad.page_id || '',
        diasAtivo: diasAtivo,
        dataInicio: dataInicioRaw || 'Não informada',
        adText: ad.adCreativeBody || ad.ad_creative_body || ad.snapshot?.body?.text || '',
        linkUrl: ad.linkUrl || ad.link_url || ad.snapshot?.link_url || '',
        mediaType: ad.mediaType || ad.media_type || 'IMAGE',
        snapshotUrl: ad.snapshot?.ad_creative_thumbnail_url || ad.imageUrl || ad.image_url || '',
        adArchiveId: ad.adArchiveId || ad.ad_archive_id || ad.adId || ''
      });
    }

    // Ordena do anúncio com mais tempo de atividade (maior validação) para o mais recente
    minerados.sort((a, b) => b.diasAtivo - a.diasAtivo);

    // Mapeia escala horizontal
    const escalaPorPagina = {};
    minerados.forEach(ad => {
      escalaPorPagina[ad.pageName] = (escalaPorPagina[ad.pageName] || 0) + 1;
    });

    const relatorioFinal = {
      timestamp: new Date().toISOString(),
      totalAnunciosColetados: minerados.length,
      anunciosValidadosMaisDe30Dias: minerados.filter(a => a.diasAtivo >= 30).length,
      escalaPorPagina: escalaPorPagina,
      ofertas: minerados
    };

    const outputPath = path.join(__dirname, '..', 'mineracao_resultados.json');
    fs.writeFileSync(outputPath, JSON.stringify(relatorioFinal, null, 2), 'utf-8');

    console.log('-----------------------------------------------------');
    console.log(`✅ Sucesso! Relatório salvo em: ${outputPath}`);
    console.log(`🎯 Ofertas validadas (com mais de 30 dias de tela): ${relatorioFinal.anunciosValidadosMaisDe30Dias}`);
    console.log('-----------------------------------------------------');

    return relatorioFinal;

  } catch (err) {
    console.error('❌ Erro durante a execução da espionagem:', err.message);
    throw err;
  }
}

runAdEspionage();
