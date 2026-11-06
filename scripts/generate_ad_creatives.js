import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/anuncios');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const creatives = [
  // CRIATIVO 1: COMPARATIVO (LÍDER SEM KIT VS. LÍDER COM KIT)
  {
    filename: 'ad_01_comparativo_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: #FAF6F0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px 50px;
          position: relative;
        }
        .header {
          text-align: center;
        }
        .pill {
          display: inline-block;
          background: #FEF3C7;
          border: 2px solid #D97706;
          color: #92400E;
          font-weight: 800;
          font-size: 20px;
          padding: 8px 26px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 18px;
        }
        .main-title {
          font-family: 'Playfair Display', serif;
          font-size: 46px;
          font-weight: 800;
          color: #1C1917;
          line-height: 1.15;
        }
        .main-title span {
          color: #B45309;
        }

        /* Grid Comparativo */
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 30px 0;
        }
        .col-card {
          border-radius: 28px;
          padding: 35px 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .col-bad {
          background: #FFF1F2;
          border: 3px solid #FDA4AF;
        }
        .col-good {
          background: #ECFDF5;
          border: 3px solid #6EE7B7;
        }
        .col-title {
          font-size: 26px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px dashed rgba(0,0,0,0.1);
        }
        .col-bad .col-title { color: #BE123C; }
        .col-good .col-title { color: #047857; }

        .item-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 20px;
          line-height: 1.35;
          font-weight: 600;
        }
        .col-bad .item { color: #881337; }
        .col-good .item { color: #064E3B; }
        .item-icon {
          font-size: 22px;
          flex-shrink: 0;
        }

        /* Rodapé Oferta */
        .footer-box {
          background: #1C1917;
          border-radius: 28px;
          padding: 30px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #FFF;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        .offer-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .offer-icon { font-size: 54px; }
        .offer-text h4 {
          font-size: 26px;
          font-weight: 800;
          color: #FCD34D;
        }
        .offer-text p {
          font-size: 18px;
          color: #E7E5E4;
        }
        .price-badge {
          background: #10B981;
          color: #FFF;
          font-size: 28px;
          font-weight: 900;
          padding: 14px 28px;
          border-radius: 16px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="pill">✝️ Pastoral Juvenil • Grupos de Jovens</div>
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
              <span>Sexta-feira 23h caçando dinâmicas no Google</span>
            </div>
            <div class="item">
              <span class="item-icon">🤦‍♂️</span>
              <span>Dinâmicas manjadas que ninguém quer participar</span>
            </div>
            <div class="item">
              <span class="item-icon">📱</span>
              <span>Jovens dispersos e vidrados no celular</span>
            </div>
            <div class="item">
              <span class="item-icon">😫</span>
              <span>Cansaço mental e sensação de sobrecarga</span>
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
              <span>Abre a pasta, escolhe o tema e imprime em 5 min</span>
            </div>
            <div class="item">
              <span class="item-icon">🎯</span>
              <span>+70 Dinâmicas com propósito bíblico comprovado</span>
            </div>
            <div class="item">
              <span class="item-icon">🔥</span>
              <span>Jovens engajados, atentos e participativos</span>
            </div>
            <div class="item">
              <span class="item-icon">🙏</span>
              <span>Paz de espírito e encontros inesquecíveis</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-box">
        <div class="offer-left">
          <span class="offer-icon">📖</span>
          <div class="offer-text">
            <h4>Mais de 70 Recursos Prontos em PDF A4</h4>
            <p>Acesso Imediato no WhatsApp e E-mail</p>
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

  // CRIATIVO 2: DINÂMICA REVELADA (CURIOSIDADE & ALTO CTR)
  {
    filename: 'ad_02_dinamica_revelada_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: #1E293B;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px 50px;
          position: relative;
          color: #FFF;
        }
        .header {
          text-align: center;
        }
        .tag {
          display: inline-block;
          background: #F59E0B;
          color: #0F172A;
          font-weight: 900;
          font-size: 20px;
          padding: 8px 26px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .main-title {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 800;
          color: #FFF;
          line-height: 1.15;
        }
        .main-title span {
          color: #FCD34D;
        }

        /* Ficha Prática da Dinâmica */
        .card-sheet {
          background: #FAF6F0;
          color: #1C1917;
          border-radius: 28px;
          padding: 40px;
          border: 4px solid #D97706;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          position: relative;
        }
        .sheet-stamp {
          position: absolute;
          top: 30px;
          right: 35px;
          background: #D97706;
          color: #FFF;
          font-weight: 800;
          font-size: 16px;
          padding: 6px 16px;
          border-radius: 8px;
          text-transform: uppercase;
        }
        .sheet-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 800;
          color: #78350F;
          margin-bottom: 20px;
        }
        .meta-badges {
          display: flex;
          gap: 16px;
          margin-bottom: 25px;
        }
        .meta-pill {
          background: #F4ECE1;
          color: #78350F;
          font-weight: 700;
          font-size: 17px;
          padding: 8px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-box {
          margin-bottom: 20px;
        }
        .section-label {
          font-size: 15px;
          font-weight: 800;
          color: #B45309;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .section-content {
          font-size: 20px;
          color: #44403C;
          line-height: 1.4;
          font-weight: 600;
        }

        /* Rodapé de Oferta */
        .footer-cta {
          background: #0F172A;
          border: 2px solid #334155;
          border-radius: 28px;
          padding: 25px 35px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cta-txt h3 {
          font-size: 24px;
          font-weight: 800;
          color: #FFF;
        }
        .cta-txt p {
          font-size: 17px;
          color: #94A3B8;
        }
        .cta-btn {
          background: #10B981;
          color: #FFF;
          font-size: 22px;
          font-weight: 900;
          padding: 16px 32px;
          border-radius: 16px;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="tag">🔥 DINÂMICA REVELADA #04</div>
        <h1 class="main-title">A Dinâmica da <span>Ponte de Papel</span></h1>
        <p style="font-size: 20px; color: #CBD5E1; margin-top: 10px;">Como destravar jovens tímidos e ensinar apoio mútuo em 12 minutos</p>
      </div>

      <div class="card-sheet">
        <div class="sheet-stamp">Formato PDF A4</div>
        <h2 class="sheet-title">Construindo a Ponte de Confiança</h2>
        
        <div class="meta-badges">
          <div class="meta-pill">⏱️ 12 Minutos</div>
          <div class="meta-pill">📦 Folhas A4 e Fita Crepe</div>
          <div class="meta-pill">📖 Gálatas 6, 2</div>
        </div>

        <div class="section-box">
          <div class="section-label">Como Conduzir:</div>
          <div class="section-content">Divida em trios. Cada trio deve apoiar uma garrafa cheia usando apenas folhas dobradas sem rasgar. Ensina na prática que ninguém suporta o peso da vida sozinho.</div>
        </div>

        <div class="section-box" style="margin-bottom: 0;">
          <div class="section-label">Perguntas Reflexivas Prontas:</div>
          <div class="section-content">"Quem tem sido o seu suporte quando as coisas pesam?" e "Em quem você confia para partilhar suas dores?"</div>
        </div>
      </div>

      <div class="footer-cta">
        <div class="cta-txt">
          <h3>Esta é apenas 1 das 70 dinâmicas prontas.</h3>
          <p>Tenha o acervo pastoral completo por apenas R$ 37,00</p>
        </div>
        <div class="cta-btn">
          BAIXAR AGORA
        </div>
      </div>
    </body>
    </html>
    `
  },

  // CRIATIVO 3: PILHA COMPLETA DOS 5 MÓDULOS (PERCEPÇÃO DE VALOR MÁXIMA)
  {
    filename: 'ad_03_acervo_completo_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: linear-gradient(135deg, #451A03 0%, #78350F 50%, #92400E 100%);
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px 50px;
          color: #FFF;
        }
        .header {
          text-align: center;
        }
        .badge {
          display: inline-block;
          background: rgba(254, 243, 199, 0.2);
          border: 1px solid #FDE68A;
          color: #FDE68A;
          font-weight: 800;
          font-size: 19px;
          padding: 8px 24px;
          border-radius: 50px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 800;
          line-height: 1.15;
        }
        .title span { color: #FCD34D; }

        /* Pilha de Módulos */
        .modules-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 25px 0;
        }
        .mod-row {
          background: #FAF6F0;
          color: #1C1917;
          border-radius: 20px;
          padding: 22px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .mod-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .mod-icon {
          font-size: 38px;
        }
        .mod-name h3 {
          font-size: 22px;
          font-weight: 800;
          color: #451A03;
        }
        .mod-name p {
          font-size: 16px;
          color: #78350F;
          font-weight: 600;
        }
        .mod-tag {
          background: #FEF3C7;
          color: #B45309;
          font-weight: 900;
          font-size: 16px;
          padding: 6px 16px;
          border-radius: 10px;
        }

        /* Rodapé de Chamada */
        .cta-container {
          background: #1C1917;
          border: 2px solid #D97706;
          border-radius: 28px;
          padding: 30px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .price-box .old-p {
          font-size: 20px;
          color: #A8A29E;
          text-decoration: line-through;
        }
        .price-box .new-p {
          font-size: 42px;
          font-weight: 900;
          color: #10B981;
          line-height: 1;
        }
        .btn-action {
          background: #D97706;
          color: #FFF;
          font-size: 24px;
          font-weight: 900;
          padding: 18px 36px;
          border-radius: 18px;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="badge">📖 Acervo Digital Completo 2026</div>
        <h1 class="title">Tudo o Que Seu Grupo Precisa <br><span>em Um Único PDF</span> Pronto</h1>
      </div>

      <div class="modules-stack">
        <div class="mod-row">
          <div class="mod-info">
            <span class="mod-icon">🎲</span>
            <div class="mod-name">
              <h3>Módulo 1: 35 Dinâmicas Quebra-Gelo</h3>
              <p>Atividades com passo a passo e perguntas reflexivas</p>
            </div>
          </div>
          <div class="mod-tag">35 FICHAS</div>
        </div>

        <div class="mod-row">
          <div class="mod-info">
            <span class="mod-icon">📖</span>
            <div class="mod-name">
              <h3>Módulo 2: 25 Roteiros de Temas Atuais</h3>
              <p>Ansiedade, namoro, amizade, oração e redes sociais</p>
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
          QUERO O KIT COMPLETO ➔
        </div>
      </div>
    </body>
    </html>
    `
  }
];

async function generate() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // 4:5 oficial do Meta Ads: 1080 x 1350 px
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
  console.log('\n🎉 Todos os 3 anúncios 4:5 foram gerados com sucesso!');
}

generate().catch(console.error);
