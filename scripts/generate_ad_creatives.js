import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/anuncios');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const creatives = [
  // =========================================================================
  // CRIATIVO 1: COMPARATIVO ANTES VS DEPOIS (REMASTERIZADO POR DAVINCI & ATENA)
  // =========================================================================
  {
    filename: 'ad_01_comparativo_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: radial-gradient(circle at 50% 15%, #FFFDF9 0%, #F5EFEB 100%);
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 65px 55px;
          position: relative;
          color: #1C1917;
        }
        
        .header {
          text-align: center;
        }
        .pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FEF3C7;
          border: 2px solid #D97706;
          color: #92400E;
          font-weight: 800;
          font-size: 20px;
          padding: 10px 28px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.15);
        }
        .main-title {
          font-family: 'Playfair Display', serif;
          font-size: 52px;
          font-weight: 900;
          color: #1C1917;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }
        .main-title span {
          color: #B45309;
          font-style: italic;
        }

        /* Grid Comparativo Otimizado Mobile */
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin: 30px 0;
        }
        .col-card {
          border-radius: 32px;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 16px 36px rgba(0,0,0,0.06);
        }
        .col-bad {
          background: #FFF1F2;
          border: 3px solid #FDA4AF;
        }
        .col-good {
          background: #ECFDF5;
          border: 3px solid #6EE7B7;
          box-shadow: 0 20px 45px rgba(16, 185, 129, 0.15);
        }
        .col-title {
          font-size: 28px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 30px;
          padding-bottom: 18px;
          border-bottom: 2px dashed rgba(0,0,0,0.12);
        }
        .col-bad .col-title { color: #BE123C; }
        .col-good .col-title { color: #047857; }

        .item-list {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }
        .item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 23px;
          line-height: 1.35;
          font-weight: 600;
        }
        .col-bad .item { color: #881337; }
        .col-good .item { color: #064E3B; font-weight: 700; }
        .item-icon {
          font-size: 30px;
          flex-shrink: 0;
          line-height: 1;
        }

        /* Rodapé de Alta Conversão */
        .footer-box {
          background: #1C1917;
          border: 2px solid #38302B;
          border-radius: 32px;
          padding: 28px 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #FFF;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }
        .offer-left {
          display: flex;
          align-items: center;
          gap: 22px;
        }
        .offer-icon { font-size: 60px; }
        .offer-text h4 {
          font-size: 28px;
          font-weight: 900;
          color: #FCD34D;
          letter-spacing: -0.5px;
        }
        .offer-text p {
          font-size: 20px;
          color: #E7E5E4;
          font-weight: 500;
        }
        .price-badge {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFF;
          font-size: 30px;
          font-weight: 900;
          padding: 16px 36px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
          letter-spacing: 0.5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="pill-badge">✝️ Pastoral Juvenil • Grupos de Jovens</div>
        <h1 class="main-title">Liderar Encontros de Jovens <br><span>não precisa ser um pesadelo</span> na sexta-feira.</h1>
      </div>

      <div class="comparison-grid">
        <div class="col-card col-bad">
          <div class="col-title">
            <span>❌</span> Sem o Kit Pastoral
          </div>
          <div class="item-list">
            <div class="item">
              <span class="item-icon">⌛</span>
              <span><strong>Sexta-feira 23h</strong> caçando dinâmicas no Google</span>
            </div>
            <div class="item">
              <span class="item-icon">🤦‍♂️</span>
              <span><strong>Dinâmicas manjadas</strong> que ninguém quer participar</span>
            </div>
            <div class="item">
              <span class="item-icon">📱</span>
              <span><strong>Jovens dispersos</strong> e vidrados no celular</span>
            </div>
            <div class="item">
              <span class="item-icon">😫</span>
              <span><strong>Cansaço mental</strong> e sensação de sobrecarga</span>
            </div>
          </div>
        </div>

        <div class="col-card col-good">
          <div class="col-title">
            <span>✅</span> Com o Kit Pastoral
          </div>
          <div class="item-list">
            <div class="item">
              <span class="item-icon">⚡</span>
              <span><strong>Imprime em 5 min:</strong> temas e dinâmicas já prontos</span>
            </div>
            <div class="item">
              <span class="item-icon">🎯</span>
              <span><strong>+70 Dinâmicas</strong> com moral bíblica comprovada</span>
            </div>
            <div class="item">
              <span class="item-icon">🔥</span>
              <span><strong>Jovens engajados,</strong> atentos e participativos</span>
            </div>
            <div class="item">
              <span class="item-icon">🙏</span>
              <span><strong>Paz de espírito</strong> e encontros inesquecíveis</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-box">
        <div class="offer-left">
          <span class="offer-icon">📖</span>
          <div class="offer-text">
            <h4>Mais de 70 Recursos em PDF A4</h4>
            <p>Download Imediato no Celular ou Computador</p>
          </div>
        </div>
        <div class="price-badge">
          R$ 37,00
        </div>
      </div>
    </body>
    </html>
    `
  },

  // =========================================================================
  // CRIATIVO 2: DINÂMICA REVELADA (REMASTERIZADO POR DAVINCI & ATENA)
  // =========================================================================
  {
    filename: 'ad_02_dinamica_revelada_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: linear-gradient(180deg, #0B132B 0%, #1C2541 60%, #0F172A 100%);
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 65px 55px;
          position: relative;
          color: #FFF;
        }

        .header {
          text-align: center;
        }
        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #F59E0B;
          color: #0F172A;
          font-weight: 900;
          font-size: 20px;
          padding: 10px 28px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 18px;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.35);
        }
        .main-title {
          font-family: 'Playfair Display', serif;
          font-size: 54px;
          font-weight: 900;
          color: #FFF;
          line-height: 1.15;
        }
        .main-title span {
          color: #FCD34D;
          font-style: italic;
        }
        .subtitle {
          font-size: 22px;
          color: #94A3B8;
          font-weight: 600;
          margin-top: 12px;
        }

        /* Card Central da Dinâmica */
        .card-sheet {
          background: #FAF6F0;
          color: #1C1917;
          border-radius: 34px;
          padding: 46px 42px;
          border: 4px solid #D97706;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.8);
          position: relative;
          margin: 15px 0;
        }
        .sheet-stamp {
          position: absolute;
          top: 35px;
          right: 35px;
          background: #D97706;
          color: #FFF;
          font-weight: 900;
          font-size: 17px;
          padding: 8px 20px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 10px rgba(217, 119, 6, 0.3);
        }
        .sheet-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 900;
          color: #78350F;
          margin-bottom: 22px;
          padding-right: 180px;
        }

        .meta-badges {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .meta-pill {
          background: #F4ECE1;
          color: #78350F;
          font-weight: 800;
          font-size: 19px;
          padding: 10px 20px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #E6D7C3;
        }

        .section-box {
          margin-bottom: 24px;
        }
        .section-label {
          font-size: 17px;
          font-weight: 900;
          color: #B45309;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }
        .section-content {
          font-size: 24px;
          color: #292524;
          line-height: 1.45;
          font-weight: 600;
        }

        .quote-box {
          background: #FEF3C7;
          border-left: 6px solid #D97706;
          padding: 20px 24px;
          border-radius: 0 18px 18px 0;
        }
        .quote-box p {
          font-size: 22px;
          color: #78350F;
          font-weight: 700;
          font-style: italic;
          line-height: 1.4;
        }

        /* Rodapé Oferta */
        .footer-cta {
          background: #0B132B;
          border: 2px solid #334155;
          border-radius: 32px;
          padding: 28px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .cta-txt h3 {
          font-size: 26px;
          font-weight: 900;
          color: #FFF;
        }
        .cta-txt p {
          font-size: 19px;
          color: #94A3B8;
          margin-top: 4px;
        }
        .cta-btn {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFF;
          font-size: 24px;
          font-weight: 900;
          padding: 18px 38px;
          border-radius: 20px;
          text-transform: uppercase;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
          letter-spacing: 0.5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="tag-pill">🔥 DINÂMICA REVELADA #04 • 100% PRONTA</div>
        <h1 class="main-title">A Dinâmica da <span>Ponte de Papel</span></h1>
        <p class="subtitle">Como destravar jovens tímidos e ensinar comunhão real em 12 minutos</p>
      </div>

      <div class="card-sheet">
        <div class="sheet-stamp">PDF A4 IMPRIMÍVEL</div>
        <h2 class="sheet-title">Construindo a Ponte de Confiança</h2>
        
        <div class="meta-badges">
          <div class="meta-pill">⏱️ 12 Minutos</div>
          <div class="meta-pill">📦 A4 e Fita Crepe</div>
          <div class="meta-pill">📖 Gálatas 6, 2</div>
        </div>

        <div class="section-box">
          <div class="section-label">Como Conduzir na Prática:</div>
          <div class="section-content">Divida o grupo em trios. Cada trio deve apoiar uma garrafa cheia usando apenas folhas dobradas sem rasgar. Ensina que ninguém suporta o peso da vida sozinho.</div>
        </div>

        <div class="section-box quote-box" style="margin-bottom: 0;">
          <div class="section-label" style="color: #92400E;">Perguntas Reflexivas para Ministrar:</div>
          <p>"Quem tem sido o seu suporte quando as coisas pesam?" e "Em quem você confia para partilhar suas dores?"</p>
        </div>
      </div>

      <div class="footer-cta">
        <div class="cta-txt">
          <h3>Esta é apenas 1 das 70 dinâmicas do acervo.</h3>
          <p>Tenha o material completo por apenas R$ 37,00</p>
        </div>
        <div class="cta-btn">
          BAIXAR AGORA
        </div>
      </div>
    </body>
    </html>
    `
  },

  // =========================================================================
  // CRIATIVO 3: ACERVO COMPLETO DOS 5 MÓDULOS (REMASTERIZADO POR DAVINCI & ATENA)
  // =========================================================================
  {
    filename: 'ad_03_acervo_completo_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: linear-gradient(145deg, #2A0800 0%, #4D1800 45%, #78350F 100%);
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px 52px;
          color: #FFF;
          position: relative;
        }

        .header {
          text-align: center;
        }
        .gold-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(254, 243, 199, 0.15);
          border: 2px solid #FDE68A;
          color: #FDE68A;
          font-weight: 800;
          font-size: 20px;
          padding: 10px 30px;
          border-radius: 50px;
          text-transform: uppercase;
          margin-bottom: 18px;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(253, 230, 138, 0.2);
        }
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 54px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }
        .title span { color: #FCD34D; font-style: italic; }

        /* Pilha dos 5 Módulos com Acabamento Premium */
        .modules-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 20px 0;
        }
        .mod-row {
          background: rgba(255, 252, 245, 0.98);
          color: #1C1917;
          border-radius: 22px;
          padding: 24px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 12px 28px rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.8);
        }
        .mod-info {
          display: flex;
          align-items: center;
          gap: 22px;
        }
        .mod-icon {
          font-size: 42px;
          line-height: 1;
        }
        .mod-name h3 {
          font-size: 24px;
          font-weight: 900;
          color: #451A03;
          letter-spacing: -0.3px;
        }
        .mod-name p {
          font-size: 18px;
          color: #78350F;
          font-weight: 600;
          margin-top: 3px;
        }
        .mod-tag {
          background: #FEF3C7;
          border: 1.5px solid #F59E0B;
          color: #B45309;
          font-weight: 900;
          font-size: 17px;
          padding: 8px 18px;
          border-radius: 12px;
          white-space: nowrap;
        }

        /* Rodapé de Conversão */
        .cta-container {
          background: #1C1917;
          border: 2px solid #D97706;
          border-radius: 32px;
          padding: 28px 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }
        .price-box {
          display: flex;
          flex-direction: column;
        }
        .price-box .old-p {
          font-size: 22px;
          color: #A8A29E;
          text-decoration: line-through;
          font-weight: 600;
        }
        .price-box .new-p {
          font-size: 46px;
          font-weight: 900;
          color: #10B981;
          line-height: 1;
          letter-spacing: -0.5px;
        }
        .btn-action {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFF;
          font-size: 24px;
          font-weight: 900;
          padding: 18px 38px;
          border-radius: 20px;
          text-transform: uppercase;
          box-shadow: 0 10px 25px rgba(217, 119, 6, 0.4);
          letter-spacing: 0.5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="gold-badge">📚 ACERVO DIGITAL COMPLETO 2026 • MAIS DE 300 PÁGINAS</div>
        <h1 class="title">Tudo o Que Seu Grupo Precisa <br><span>em Um Único PDF Pronto</span></h1>
      </div>

      <div class="modules-stack">
        <div class="mod-row">
          <div class="mod-info">
            <span class="mod-icon">🎲</span>
            <div class="mod-name">
              <h3>Módulo 1: 35 Dinâmicas Quebra-Gelo</h3>
              <p>Passo a passo detalhado e perguntas reflexivas</p>
            </div>
          </div>
          <div class="mod-tag">35 FICHAS</div>
        </div>

        <div class="mod-row">
          <div class="mod-info">
            <span class="mod-icon">📖</span>
            <div class="mod-name">
              <h3>Módulo 2: 25 Roteiros de Temas Atuais</h3>
              <p>Ansiedade, namoro santo, amizade, oração e celular</p>
            </div>
          </div>
          <div class="mod-tag">25 TEMAS</div>
        </div>

        <div class="mod-row">
          <div class="mod-info">
            <span class="mod-icon">⛺</span>
            <div class="mod-name">
              <h3>Módulo 3: 44 Ideias e Roteiros de Retiros</h3>
              <p>Cronogramas completos de 1 e 2 dias prontos</p>
            </div>
          </div>
          <div class="mod-tag">44 ROTEIROS</div>
        </div>

        <div class="mod-row">
          <div class="mod-info">
            <span class="mod-icon">💬</span>
            <div class="mod-name">
              <h3>Módulo 4: 28 Desafios Semanais WhatsApp</h3>
              <p>Para manter os jovens conectados durante a semana</p>
            </div>
          </div>
          <div class="mod-tag">28 DESAFIOS</div>
        </div>

        <div class="mod-row">
          <div class="mod-info">
            <span class="mod-icon">📜</span>
            <div class="mod-name">
              <h3>Módulo 5: 100 Versículos Temáticos</h3>
              <p>Direcionamentos bíblicos rápidos para ministração</p>
            </div>
          </div>
          <div class="mod-tag">100 TEXTOS</div>
        </div>
      </div>

      <div class="cta-container">
        <div class="price-box">
          <div class="old-p">De R$ 97,00</div>
          <div class="new-p">R$ 37,00</div>
        </div>
        <div class="btn-action">
          QUERO O ACERVO COMPLETO ➔
        </div>
      </div>
    </body>
    </html>
    `
  }
];

async function generate() {
  console.log('🎨 DaVinci: Renderizando as novas artes em 4:5 (1080x1350)...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });

  for (const c of creatives) {
    console.log(`Renderizando anúncio 4:5: ${c.filename}...`);
    await page.setContent(c.html, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));
    const targetPath = path.join(outDir, c.filename);
    await page.screenshot({ path: targetPath, type: 'png' });
    console.log(`✅ Salvo com sucesso: ${targetPath}`);
  }

  await browser.close();
  console.log('\n🎉 DaVinci: Todos os 3 anúncios foram remasterizados com sucesso!');
}

generate().catch(console.error);
