import puppeteer from 'puppeteer';
import path from 'path';

async function generateBanner() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 360, deviceScaleFactor: 2 });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1400px;
        height: 360px;
        background: linear-gradient(135deg, #451A03 0%, #78350F 40%, #92400E 75%, #B45309 100%);
        font-family: 'Plus Jakarta Sans', sans-serif;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 60px;
        position: relative;
        overflow: hidden;
      }
      .pattern-overlay {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px);
        background-size: 24px 24px;
        pointer-events: none;
      }
      .glow {
        position: absolute;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%);
        top: -50px;
        left: 80px;
        filter: blur(40px);
      }
      .content-left {
        max-width: 820px;
        z-index: 2;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(254, 243, 199, 0.15);
        border: 1px solid rgba(253, 230, 138, 0.4);
        backdrop-filter: blur(10px);
        color: #FDE68A;
        font-size: 14px;
        font-weight: 700;
        padding: 6px 16px;
        border-radius: 50px;
        margin-bottom: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .title {
        font-family: 'Playfair Display', serif;
        font-size: 44px;
        font-weight: 800;
        color: #FFF;
        line-height: 1.15;
        margin-bottom: 10px;
        text-shadow: 0 4px 12px rgba(0,0,0,0.4);
      }
      .title span {
        color: #FCD34D;
      }
      .subtitle {
        font-size: 18px;
        color: #FEF3C7;
        font-weight: 500;
        line-height: 1.4;
        margin-bottom: 18px;
      }
      .badges {
        display: flex;
        gap: 20px;
        align-items: center;
      }
      .badge-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #FFF;
        font-size: 14px;
        font-weight: 600;
      }
      .badge-item span {
        font-size: 18px;
      }
      .mockup-right {
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .book-3d {
        width: 170px;
        height: 240px;
        background: #FAF6F0;
        border-radius: 12px;
        border: 3px solid #D97706;
        box-shadow: -15px 20px 40px rgba(0,0,0,0.6);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 16px;
        text-align: center;
        transform: perspective(600px) rotateY(-18deg) rotateX(4deg);
      }
      .book-title {
        font-family: 'Playfair Display', serif;
        font-size: 15px;
        font-weight: 800;
        color: #78350F;
        line-height: 1.2;
      }
      .book-badge {
        background: #D97706;
        color: #FFF;
        font-size: 10px;
        font-weight: 800;
        padding: 4px;
        border-radius: 6px;
      }
      .lock-badge {
        position: absolute;
        top: 24px;
        right: 40px;
        background: rgba(16, 185, 129, 0.2);
        border: 1px solid #10B981;
        color: #A7F3D0;
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    </style>
  </head>
  <body>
    <div class="pattern-overlay"></div>
    <div class="glow"></div>
    <div class="lock-badge">
      🔒 AMBIENTE 100% CRIPTOGRAFADO & SEGURO
    </div>

    <div class="content-left">
      <div class="pill">
        ✝️ ACERVO PASTORAL EXCLUSIVO PARA LÍDERES
      </div>
      <h1 class="title">Kit Líder de Encontros <span>& Retiros</span></h1>
      <p class="subtitle">Mais de 70 dinâmicas com propósito bíblico, roteiros completos e modelos prontos em PDF.</p>
      
      <div class="badges">
        <div class="badge-item"><span>⚡</span> Acesso Imediato no E-mail</div>
        <div class="badge-item"><span>📜</span> Formato PDF A4 Pronto</div>
        <div class="badge-item"><span>🛡️</span> Garantia de 15 Dias</div>
      </div>
    </div>

    <div class="mockup-right">
      <div class="book-3d">
        <span style="font-size: 28px;">✝️</span>
        <div class="book-title">KIT LÍDER DE ENCONTROS</div>
        <div class="book-badge">PDF A4 • 300+ PÁGINAS</div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));
  const target = path.resolve('public/assets/banner_topo_full.png');
  await page.screenshot({ path: target, type: 'png' });
  await browser.close();
  console.log(`✅ Banner gerado em ${target}`);
}

generateBanner().catch(console.error);
