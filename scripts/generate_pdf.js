import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDFs() {
  console.log('📄 Iniciando geração automatizada das apostilas em PDF...');

  const outputDir = path.join(__dirname, '..', 'dist', 'pdfs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Carrega os dados dos módulos
  const dinamicas = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'conteudo', '01_dinamicas.json'), 'utf8'));
  const temas = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'conteudo', '02_temas.json'), 'utf8'));
  const retiros = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'conteudo', '03_retiros.json'), 'utf8'));

  // Gera HTML estilizado para A4
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <style>
      @page {
        size: A4;
        margin: 20mm 15mm 20mm 15mm;
        @bottom-right {
          content: counter(page);
        }
      }
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #292524;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      .capa {
        page-break-after: always;
        text-align: center;
        padding-top: 60mm;
      }
      .capa-tag {
        font-size: 11pt;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #b45309;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .capa-titulo {
        font-size: 28pt;
        color: #1c1917;
        margin-bottom: 20px;
        line-height: 1.2;
      }
      .capa-sub {
        font-size: 14pt;
        color: #57534e;
        max-width: 450px;
        margin: 0 auto 50mm auto;
      }
      .capa-footer {
        font-size: 10pt;
        color: #a8a29e;
        border-top: 1px solid #e7e5e4;
        padding-top: 15px;
      }
      .secao {
        page-break-before: always;
      }
      .secao-header {
        border-bottom: 2px solid #d97706;
        padding-bottom: 8px;
        margin-bottom: 25px;
      }
      .secao-titulo {
        font-size: 18pt;
        color: #b45309;
        margin: 0;
      }
      .card-item {
        background: #fafaf9;
        border: 1px solid #e7e5e4;
        border-radius: 8px;
        padding: 16px 20px;
        margin-bottom: 20px;
        page-break-inside: avoid;
      }
      .item-titulo {
        font-size: 14pt;
        font-weight: bold;
        color: #1c1917;
        margin-bottom: 6px;
      }
      .item-badge {
        display: inline-block;
        background: #fef3c7;
        color: #92400e;
        font-size: 9pt;
        font-weight: bold;
        padding: 2px 8px;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .item-versiculo {
        font-style: italic;
        background: #fff;
        border-left: 3px solid #d97706;
        padding: 8px 12px;
        margin: 10px 0;
        font-size: 10pt;
        color: #44403c;
      }
      ol, ul {
        margin: 8px 0;
        padding-left: 20px;
        font-size: 10pt;
      }
      li {
        margin-bottom: 6px;
      }
    </style>
  </head>
  <body>
    <!-- CAPA -->
    <div class="capa">
      <div class="capa-tag">Coleção Pastoral Juvenil</div>
      <h1 class="capa-titulo">KIT LÍDER DE ENCONTROS</h1>
      <p class="capa-sub">Mais de 300 dinâmicas, temas atuais, roteiros e retiros prontos para imprimir e aplicar.</p>
      <div class="capa-footer">Apostila de Apoio Pastoral • Uso Comunitário • Formato A4</div>
    </div>

    <!-- MÓDULO 1: DINÂMICAS -->
    <div class="secao">
      <div class="secao-header">
        <h2 class="secao-titulo">Módulo 01: Dinâmicas Quebra-Gelo com Propósito Bíblico</h2>
      </div>
      ${dinamicas.map(d => `
        <div class="card-item">
          <div class="item-titulo">${d.id}. ${d.titulo}</div>
          <span class="item-badge">⏱️ Tempo: ${d.tempo_estimado}</span>
          <div class="item-versiculo">${d.versiculo_base}</div>
          <p><strong>Objetivo:</strong> ${d.objetivo}</p>
          <p><strong>Materiais:</strong> ${d.materiais_necessarios.join(', ')}</p>
          <p><strong>Como Conduzir:</strong></p>
          <ol>
            ${d.conducao.map(c => `<li>${c}</li>`).join('')}
          </ol>
          <p><strong>Perguntas Reflexivas para o Grupo:</strong></p>
          <ul>
            ${d.perguntas_reflexivas.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>

    <!-- MÓDULO 2: TEMAS ATUAIS -->
    <div class="secao">
      <div class="secao-header">
        <h2 class="secao-titulo">Módulo 02: Roteiros de Temas Cruciais da Juventude</h2>
      </div>
      ${temas.map(t => `
        <div class="card-item">
          <div class="item-titulo">${t.id}. ${t.tema}</div>
          <span class="item-badge">⏱️ Duração: ${t.tempo_sugerido}</span>
          <div class="item-versiculo">${t.versiculo_chave}</div>
          <p><strong>Objetivo:</strong> ${t.objetivo}</p>
          <p><strong>Quebra-Gelo Inicial:</strong> ${t.quebra_gelo}</p>
          <p><strong>Roteiro da Partilha:</strong></p>
          <ul>
            ${t.roteiro_falado.map(r => `<li>${r}</li>`).join('')}
          </ul>
          <p><strong>Perguntas para Roda de Conversa:</strong></p>
          <ul>
            ${t.perguntas_para_debate.map(p => `<li>${p}</li>`).join('')}
          </ul>
          <p><strong>Oração de Fechamento:</strong> <em>"${t.oracao_final}"</em></p>
        </div>
      `).join('')}
    </div>

    <!-- MÓDULO 3: RETIROS -->
    <div class="secao">
      <div class="secao-header">
        <h2 class="secao-titulo">Módulo 03: Cronogramas e Estrutura de Retiros</h2>
      </div>
      ${retiros.map(r => `
        <div class="card-item">
          <div class="item-titulo">${r.nome_retiro}</div>
          <div class="item-versiculo">${r.tema_central}</div>
          <p><strong>Público:</strong> ${r.publico_alvo}</p>
          ${r.cronograma_completo ? `
            <p><strong>Cronograma Passo a Passo:</strong></p>
            <ul>
              ${r.cronograma_completo.map(c => `<li><strong>${c.horario}</strong> - ${c.atividade}: <em>${c.detalhes}</em></li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
  </body>
  </html>
  `;

  const htmlPath = path.join(outputDir, 'apostila_preview.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ HTML diagramado gerado em: ${htmlPath}`);

  // Dispara Puppeteer para imprimir em PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(outputDir, 'Apostila_Kit_Pastoral_Completo.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  });

  await browser.close();
  console.log(`🎉 PDF Oficial Gerado com Sucesso: ${pdfPath}`);
}

generatePDFs().catch(console.error);
