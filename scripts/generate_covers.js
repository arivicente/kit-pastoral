import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const templates = [
  {
    filename: 'cover_kit_pastoral.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 800px;
          height: 800px;
          background: linear-gradient(135deg, #78350F 0%, #B45309 50%, #D97706 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 40px;
        }
        .card {
          width: 100%;
          height: 100%;
          background: #FAF6F0;
          border: 4px solid #D97706;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 50px 40px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4);
          position: relative;
        }
        .badge {
          background: #FEF3C7;
          border: 2px solid #D97706;
          color: #92400E;
          font-weight: 800;
          font-size: 18px;
          padding: 8px 20px;
          border-radius: 50px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .icon {
          font-size: 72px;
          margin: 10px 0;
        }
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 46px;
          font-weight: 800;
          color: #451A03;
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .subtitle {
          font-size: 20px;
          color: #78350F;
          font-weight: 600;
          max-width: 580px;
          line-height: 1.4;
        }
        .footer-pill {
          background: #B45309;
          color: #FFF;
          font-weight: 800;
          font-size: 20px;
          padding: 14px 36px;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(180,83,9,0.3);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">📖 Material 100% Pronto para Imprimir</div>
        <div class="icon">✝️</div>
        <div>
          <h1 class="title">KIT LÍDER DE ENCONTROS</h1>
          <p class="subtitle">Mais de 70 Dinâmicas, Roteiros de Temas Atuais, Retiros e Modelos Prontos em PDF</p>
        </div>
        <div class="footer-pill">ACERVO COMPLETO • FORMATO A4</div>
      </div>
    </body>
    </html>
    `
  },
  {
    filename: 'cover_devocional.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 800px;
          height: 800px;
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 40px;
        }
        .card {
          width: 100%;
          height: 100%;
          background: #0B132B;
          border: 4px solid #F59E0B;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 50px 40px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6);
        }
        .badge {
          background: #78350F;
          border: 2px solid #F59E0B;
          color: #FDE68A;
          font-weight: 800;
          font-size: 18px;
          padding: 8px 20px;
          border-radius: 50px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .icon {
          font-size: 72px;
          margin: 10px 0;
        }
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 46px;
          font-weight: 800;
          color: #F8FAFC;
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .subtitle {
          font-size: 20px;
          color: #CBD5E1;
          font-weight: 500;
          max-width: 580px;
          line-height: 1.4;
        }
        .footer-pill {
          background: #F59E0B;
          color: #0F172A;
          font-weight: 800;
          font-size: 20px;
          padding: 14px 36px;
          border-radius: 12px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">🔥 Order Bump Especial</div>
        <div class="icon">🕯️</div>
        <div>
          <h1 class="title">DEVOCIONAL GUIADO</h1>
          <p class="subtitle">30 Dias de Oração, Reflexão Bíblica e Fortalecimento para Líderes e Servos</p>
        </div>
        <div class="footer-pill">30 DIAS DE DIRECIONAMENTO DIÁRIO</div>
      </div>
    </body>
    </html>
    `
  },
  {
    filename: 'cover_canva.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 800px;
          height: 800px;
          background: linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 40px;
        }
        .card {
          width: 100%;
          height: 100%;
          background: #064E3B;
          border: 4px solid #A7F3D0;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 50px 40px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }
        .badge {
          background: #047857;
          border: 2px solid #6EE7B7;
          color: #ECFDF5;
          font-weight: 800;
          font-size: 18px;
          padding: 8px 20px;
          border-radius: 50px;
          text-transform: uppercase;
        }
        .icon {
          font-size: 72px;
          margin: 10px 0;
        }
        .title {
          font-size: 46px;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .subtitle {
          font-size: 20px;
          color: #D1FAE5;
          font-weight: 600;
          max-width: 580px;
          line-height: 1.4;
        }
        .footer-pill {
          background: #10B981;
          color: #064E3B;
          font-weight: 900;
          font-size: 20px;
          padding: 14px 36px;
          border-radius: 12px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">🎨 100% Editável no Canva Gratuito</div>
        <div class="icon">📱</div>
        <div>
          <h1 class="title">PACK 50 ARTES NO CANVA</h1>
          <p class="subtitle">Stories, Feeds, Banners e Cartazes Prontos para Retiros, Encontros e Avisos Paroquiais</p>
        </div>
        <div class="footer-pill">ACESSO IMEDIATO AOS LINKS CANVA</div>
      </div>
    </body>
    </html>
    `
  }
];

async function generate() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });

  for (const t of templates) {
    console.log(`Gerando capa: ${t.filename}...`);
    await page.setContent(t.html, { waitUntil: 'domcontentloaded' });
    // Pequena pausa para fontes carregarem
    await new Promise(r => setTimeout(r, 600));
    const targetPath = path.join(outDir, t.filename);
    await page.screenshot({ path: targetPath, type: 'png' });
    console.log(`✅ Salvo: ${targetPath}`);
  }

  await browser.close();
  console.log('Todas as capas geradas com sucesso!');
}

generate().catch(console.error);
