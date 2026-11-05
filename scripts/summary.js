import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./mineracao_resultados.json', 'utf8'));

console.log('TOTAL DE ANÚNCIOS COLETADOS:', data.totalAnunciosColetados);
console.log('ANÚNCIOS VALIDADOS (> 30 DIAS):', data.anunciosValidadosMaisDe30Dias);

console.log('\n=============================================');
console.log('🔥 PÁGINAS EM ESCALA HORIZONTAL');
console.log('=============================================');
Object.entries(data.escalaPorPagina)
  .sort((a, b) => b[1] - a[1])
  .forEach(([page, count]) => {
    console.log(`- ${page}: ${count} anúncio(s) ativo(s)`);
  });

console.log('\n=============================================');
console.log('🏆 TOP 8 ANÚNCIOS MAIS ANTIGOS (MAIOR ROAS/LONGEVIDADE)');
console.log('=============================================');
data.ofertas.slice(0, 8).forEach((ad, i) => {
  console.log(`\n[#${i + 1}] Página: ${ad.pageName}`);
  console.log(`⏱️ Tempo Ativo: ${ad.diasAtivo} dias (Início: ${ad.dataInicio})`);
  console.log(`🔗 Link: ${ad.linkUrl || 'Nenhum link direto informado'}`);
  console.log(`📝 Texto: ${ad.adText ? ad.adText.substring(0, 220).replace(/\r?\n|\r/g, ' ') : 'Sem texto'}...`);
});
