import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/anuncios');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Codifica imagens locais em Base64 para garantir carregamento instantâneo no Puppeteer
function getBase64(file) {
  try {
    const fullPath = path.resolve(file);
    if (fs.existsSync(fullPath)) {
      const ext = path.extname(file).replace('.', '');
      const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
      const b64 = fs.readFileSync(fullPath).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  } catch (e) {}
  return '';
}

const b64FonteViva = getBase64('fonte_viva_capa.png');
const b64Suzana1 = getBase64('suzana_1.jpeg');

const creatives = [
  // =========================================================================
  // ANÚNCIO 01: AUTORIDADE & ACERVO 3D (MODELADO NA EDITORA FONTE VIVA - 116 DIAS)
  // =========================================================================
  {
    filename: 'ad_01_autoridade_acervo_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,800;0,900;1,800&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: #0B0E17;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px 52px;
          color: #FFF;
          position: relative;
          overflow: hidden;
        }

        /* Efeito de iluminação celestial de fundo */
        .glow-top {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(circle, rgba(217, 119, 6, 0.25) 0%, rgba(0,0,0,0) 70%);
          pointer-events: none;
        }

        .header {
          text-align: center;
          position: relative;
          z-index: 10;
        }
        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(245, 158, 11, 0.15);
          border: 2px solid #F59E0B;
          color: #FCD34D;
          font-weight: 800;
          font-size: 20px;
          padding: 10px 28px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        }
        .main-headline {
          font-family: 'Playfair Display', serif;
          font-size: 56px;
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -0.5px;
        }
        .main-headline span {
          color: #F59E0B;
          font-style: italic;
        }
        .sub-headline {
          font-size: 22px;
          color: #CBD5E1;
          font-weight: 600;
          margin-top: 12px;
        }

        /* Mockup Central 3D */
        .mockup-container {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0;
        }
        .mockup-img {
          height: 540px;
          object-fit: contain;
          filter: drop-shadow(0 30px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(245, 158, 11, 0.2));
          border-radius: 20px;
        }

        /* Selos de Benefício em Pílulas */
        .badges-row {
          display: flex;
          justify-content: center;
          gap: 16px;
          position: relative;
          z-index: 10;
          margin-bottom: 10px;
        }
        .badge-item {
          background: #1E293B;
          border: 1.5px solid #334155;
          color: #F1F5F9;
          font-weight: 800;
          font-size: 19px;
          padding: 10px 22px;
          border-radius: 14px;
        }

        /* Rodapé de Oferta */
        .footer-cta {
          background: #111827;
          border: 2px solid #D97706;
          border-radius: 32px;
          padding: 26px 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 10;
          box-shadow: 0 25px 50px rgba(0,0,0,0.6);
        }
        .price-col .old-p {
          font-size: 20px;
          color: #9CA3AF;
          text-decoration: line-through;
          font-weight: 600;
        }
        .price-col .new-p {
          font-size: 46px;
          font-weight: 900;
          color: #10B981;
          line-height: 1;
        }
        .cta-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFF;
          font-size: 24px;
          font-weight: 900;
          padding: 18px 40px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 10px 25px rgba(217, 119, 6, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="glow-top"></div>

      <div class="header">
        <div class="badge-pill">✝️ MATERIAL PASTORAL OFICIAL • ED. 2026</div>
        <h1 class="main-headline">100 Esboços & Dinâmicas <br><span>para Encontros de Jovens</span></h1>
        <p class="sub-headline">Mensagens profundas e atividades práticas para impactar sua comunidade</p>
      </div>

      <div class="mockup-container">
        <img class="mockup-img" src="${b64FonteViva}" alt="Mockup 3D Acervo Completo">
      </div>

      <div class="badges-row">
        <div class="badge-item">📖 100 Esboços Bíblicos</div>
        <div class="badge-item">⚡ +70 Dinâmicas Aplicadas</div>
        <div class="badge-item">⛺ 44 Roteiros de Retiro</div>
      </div>

      <div class="footer-cta">
        <div class="price-col">
          <div class="old-p">De R$ 97,00</div>
          <div class="new-p">R$ 37,00</div>
        </div>
        <div class="cta-btn">
          BAIXAR AGORA ➔
        </div>
      </div>
    </body>
    </html>
    `
  },

  // =========================================================================
  // ANÚNCIO 02: APOSTILA ESPIRAL 3D (MODELADO NA SUZANA LIMA - 54 DIAS)
  // =========================================================================
  {
    filename: 'ad_02_caderno_espiral_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Playfair+Display:ital,wght@0,900;1,900&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: #0B132B;
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
        .yellow-tag {
          display: inline-block;
          background: #F59E0B;
          color: #0B132B;
          font-weight: 900;
          font-size: 20px;
          padding: 10px 30px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 54px;
          font-weight: 900;
          line-height: 1.15;
        }
        .title span { color: #FCD34D; font-style: italic; }
        .sub {
          font-size: 22px;
          color: #94A3B8;
          font-weight: 600;
          margin-top: 10px;
        }

        /* Mockup Espiral em Destaque */
        .spiral-box {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 15px 0;
        }
        .spiral-img {
          height: 550px;
          object-fit: contain;
          filter: drop-shadow(0 30px 50px rgba(0,0,0,0.8));
          border-radius: 20px;
        }

        .benefit-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 10px;
        }
        .b-card {
          background: #1C2541;
          border: 1.5px solid #3A506B;
          padding: 18px 24px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 20px;
          font-weight: 800;
          color: #F1F5F9;
        }
        .b-icon { font-size: 32px; }

        .footer-bar {
          background: #090E1D;
          border: 2px solid #F59E0B;
          border-radius: 32px;
          padding: 26px 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 25px 50px rgba(0,0,0,0.6);
        }
        .f-price h4 {
          font-size: 26px;
          font-weight: 900;
          color: #FFF;
        }
        .f-price p {
          font-size: 18px;
          color: #94A3B8;
        }
        .f-btn {
          background: #10B981;
          color: #FFF;
          font-size: 24px;
          font-weight: 900;
          padding: 18px 40px;
          border-radius: 20px;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="yellow-tag">📖 O GUIA DEFINITIVO DO MINISTÉRIO</div>
        <h1 class="title">Planejador Anual & <br><span>Acervo do Líder de Jovens</span></h1>
        <p class="sub">Você nunca mais vai improvisar no culto de sábado.</p>
      </div>

      <div class="spiral-box">
        <img class="spiral-img" src="${b64Suzana1}" alt="Caderno Espiral Líder de Jovens">
      </div>

      <div class="benefit-cards">
        <div class="b-card">
          <span class="b-icon">⚡</span>
          <span>+70 Dinâmicas Prontas para Imprimir</span>
        </div>
        <div class="b-card">
          <span class="b-icon">🎯</span>
          <span>Roteiros com Moral Bíblica Aplicada</span>
        </div>
      </div>

      <div class="footer-bar">
        <div class="f-price">
          <h4>Acesso Imediato em PDF</h4>
          <p>Download no celular por apenas R$ 37,00</p>
        </div>
        <div class="f-btn">
          QUERO O MEU ➔
        </div>
      </div>
    </body>
    </html>
    `
  },

  // =========================================================================
  // ANÚNCIO 03: COMPARATIVO ANTES VS DEPOIS (DOR & ROTINA)
  // =========================================================================
  {
    filename: 'ad_03_comparativo_sexta_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,800;0,900;1,800&display=swap" rel="stylesheet">
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
          color: #1C1917;
        }
        .header { text-align: center; }
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
          margin-bottom: 20px;
        }
        .main-title {
          font-family: 'Playfair Display', serif;
          font-size: 52px;
          font-weight: 900;
          line-height: 1.15;
        }
        .main-title span { color: #B45309; font-style: italic; }

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
        }
        .col-bad { background: #FFF1F2; border: 3px solid #FDA4AF; }
        .col-good { background: #ECFDF5; border: 3px solid #6EE7B7; box-shadow: 0 20px 45px rgba(16, 185, 129, 0.15); }
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

        .item-list { display: flex; flex-direction: column; gap: 26px; }
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
        .item-icon { font-size: 30px; line-height: 1; flex-shrink: 0; }

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
        .offer-left { display: flex; align-items: center; gap: 22px; }
        .offer-icon { font-size: 60px; }
        .offer-text h4 { font-size: 28px; font-weight: 900; color: #FCD34D; }
        .offer-text p { font-size: 20px; color: #E7E5E4; font-weight: 500; }
        .price-badge {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFF;
          font-size: 30px;
          font-weight: 900;
          padding: 16px 36px;
          border-radius: 20px;
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
          <div class="col-title"><span>❌</span> Sem o Kit Pastoral</div>
          <div class="item-list">
            <div class="item"><span class="item-icon">⌛</span><span><strong>Sexta-feira 23h</strong> caçando dinâmicas no Google</span></div>
            <div class="item"><span class="item-icon">🤦‍♂️</span><span><strong>Dinâmicas manjadas</strong> que ninguém quer participar</span></div>
            <div class="item"><span class="item-icon">📱</span><span><strong>Jovens dispersos</strong> e vidrados no celular</span></div>
            <div class="item"><span class="item-icon">😫</span><span><strong>Cansaço mental</strong> e sensação de sobrecarga</span></div>
          </div>
        </div>

        <div class="col-card col-good">
          <div class="col-title"><span>✅</span> Com o Kit Pastoral</div>
          <div class="item-list">
            <div class="item"><span class="item-icon">⚡</span><span><strong>Imprime em 5 min:</strong> temas e dinâmicas já prontos</span></div>
            <div class="item"><span class="item-icon">🎯</span><span><strong>+70 Dinâmicas</strong> com moral bíblica comprovada</span></div>
            <div class="item"><span class="item-icon">🔥</span><span><strong>Jovens engajados,</strong> atentos e participativos</span></div>
            <div class="item"><span class="item-icon">🙏</span><span><strong>Paz de espírito</strong> e encontros inesquecíveis</span></div>
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
        <div class="price-badge">R$ 37,00</div>
      </div>
    </body>
    </html>
    `
  },

  // =========================================================================
  // ANÚNCIO 04: VALOR ANTECIPADO (FICHA PRÁTICA DA PONTE DE CONFIANÇA)
  // =========================================================================
  {
    filename: 'ad_04_ficha_revelada_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,900;1,900&display=swap" rel="stylesheet">
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
          color: #FFF;
          position: relative;
        }
        .header { text-align: center; }
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
          margin-bottom: 18px;
        }
        .main-title {
          font-family: 'Playfair Display', serif;
          font-size: 54px;
          font-weight: 900;
          line-height: 1.15;
        }
        .main-title span { color: #FCD34D; font-style: italic; }
        .subtitle { font-size: 22px; color: #94A3B8; font-weight: 600; margin-top: 12px; }

        .card-sheet {
          background: #FAF6F0;
          color: #1C1917;
          border-radius: 34px;
          padding: 46px 42px;
          border: 4px solid #D97706;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
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
        }
        .sheet-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 900;
          color: #78350F;
          margin-bottom: 22px;
        }
        .meta-badges { display: flex; gap: 16px; margin-bottom: 28px; }
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
        }
        .section-label { font-size: 17px; font-weight: 900; color: #B45309; text-transform: uppercase; margin-bottom: 8px; }
        .section-content { font-size: 24px; color: #292524; line-height: 1.45; font-weight: 600; margin-bottom: 20px; }
        .quote-box {
          background: #FEF3C7;
          border-left: 6px solid #D97706;
          padding: 20px 24px;
          border-radius: 0 18px 18px 0;
        }
        .quote-box p { font-size: 22px; color: #78350F; font-weight: 700; font-style: italic; }

        .footer-cta {
          background: #0B132B;
          border: 2px solid #334155;
          border-radius: 32px;
          padding: 28px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cta-txt h3 { font-size: 26px; font-weight: 900; color: #FFF; }
        .cta-txt p { font-size: 19px; color: #94A3B8; margin-top: 4px; }
        .cta-btn {
          background: #10B981;
          color: #FFF;
          font-size: 24px;
          font-weight: 900;
          padding: 18px 38px;
          border-radius: 20px;
          text-transform: uppercase;
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

        <div class="section-label">Como Conduzir na Prática:</div>
        <div class="section-content">Divida o grupo em trios. Cada trio deve apoiar uma garrafa cheia usando apenas folhas dobradas sem rasgar. Ensina que ninguém suporta o peso da vida sozinho.</div>

        <div class="quote-box">
          <div class="section-label" style="color: #92400E;">Perguntas Reflexivas para Ministrar:</div>
          <p>"Quem tem sido o seu suporte quando as coisas pesam?" e "Em quem você confia para partilhar suas dores?"</p>
        </div>
      </div>

      <div class="footer-cta">
        <div class="cta-txt">
          <h3>Esta é apenas 1 das 70 dinâmicas do acervo.</h3>
          <p>Tenha o material completo por apenas R$ 37,00</p>
        </div>
        <div class="cta-btn">BAIXAR AGORA</div>
      </div>
    </body>
    </html>
    `
  },

  // =========================================================================
  // ANÚNCIO 05: PROVA SOCIAL WHATSAPP (VALIDAÇÃO DE LÍDERES REAIS)
  // =========================================================================
  {
    filename: 'ad_05_prova_social_whatsapp_4x5.png',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,900;1,900&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1080px;
          height: 1350px;
          background: #0B141B;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px 50px;
          color: #FFF;
          position: relative;
        }

        .header { text-align: center; }
        .green-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(37, 211, 102, 0.15);
          border: 2px solid #25D366;
          color: #25D366;
          font-weight: 800;
          font-size: 20px;
          padding: 10px 28px;
          border-radius: 50px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 52px;
          font-weight: 900;
          line-height: 1.15;
        }
        .title span { color: #25D366; font-style: italic; }

        /* Container do WhatsApp Realista */
        .chat-container {
          background: #111B21;
          border: 2px solid #222E35;
          border-radius: 32px;
          padding: 40px 32px;
          margin: 25px 0;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-bottom: 20px;
          border-bottom: 1px solid #222E35;
        }
        .chat-avatar {
          width: 70px;
          height: 70px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
        }
        .chat-user h3 {
          font-size: 26px;
          font-weight: 800;
          color: #E9EDEF;
        }
        .chat-user p {
          font-size: 18px;
          color: #8696A0;
        }

        /* Balões de Mensagem */
        .msg-bubble {
          max-width: 90%;
          padding: 24px 28px;
          border-radius: 24px;
          font-size: 24px;
          line-height: 1.45;
          position: relative;
        }
        .msg-in {
          background: #202C33;
          color: #E9EDEF;
          align-self: flex-start;
          border-bottom-left-radius: 6px;
        }
        .msg-in strong { color: #25D366; }
        .msg-out {
          background: #005C4B;
          color: #E9EDEF;
          align-self: flex-end;
          border-bottom-right-radius: 6px;
          font-weight: 600;
        }

        .stars-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .star { font-size: 32px; color: #F59E0B; }
        .stars-txt { font-size: 22px; font-weight: 800; color: #E9EDEF; }

        /* Rodapé Oferta */
        .footer-cta {
          background: #111B21;
          border: 2px solid #25D366;
          border-radius: 32px;
          padding: 26px 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }
        .f-info h4 { font-size: 26px; font-weight: 900; color: #FFF; }
        .f-info p { font-size: 19px; color: #8696A0; }
        .f-btn {
          background: #25D366;
          color: #0B141B;
          font-size: 24px;
          font-weight: 900;
          padding: 18px 38px;
          border-radius: 20px;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="green-tag">💬 RELATOS DE QUEM JÁ USOU</div>
        <h1 class="title">O Que os Líderes Dizem <br><span>Após o Primeiro Encontro</span></h1>
      </div>

      <div class="chat-container">
        <div class="chat-header">
          <div class="chat-avatar">✝️</div>
          <div class="chat-user">
            <h3>Grupo de Líderes de Jovens • RJ</h3>
            <p>Comunidade com +1.400 Coordenadores</p>
          </div>
        </div>

        <div class="msg-bubble msg-in">
          "Irmãos, passando só pra agradecer pelo <strong>Kit Pastoral</strong>! Usei a dinâmica da Ponte de Confiança no retiro de sábado e foi surreal... Até os jovens que viviam vidrados no celular participaram e se emocionaram na reflexão. <strong>Pela primeira vez saí do culto com paz de espírito!</strong> 🙏🔥"
        </div>

        <div class="msg-bubble msg-out">
          "Glória a Deus! Esse material foi feito exatamente para tirar o peso do improviso dos ombros do líder! 📖✨"
        </div>
      </div>

      <div class="stars-row">
        <span class="star">★★★★★</span>
        <span class="stars-txt">Avaliado em 4.9/5 por mais de 1.400 líderes</span>
      </div>

      <div class="footer-cta">
        <div class="f-info">
          <h4>Acervo Pastoral Completo</h4>
          <p>Acesso vitalício por apenas R$ 37,00</p>
        </div>
        <div class="f-btn">
          ACESSAR AGORA ➔
        </div>
      </div>
    </body>
    </html>
    `
  }
];

async function generate() {
  console.log('🎨 DaVinci: Renderizando a BATERIA OFICIAL DE 5 ANÚNCIOS 4:5 (1080x1350)...');
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
  console.log('\n🎉 DaVinci: TODOS OS 5 ANÚNCIOS MODELADOS FORAM GERADOS COM SUCESSO!');
}

generate().catch(console.error);
