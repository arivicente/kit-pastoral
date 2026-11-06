# 📦 Dossiê de Inteligência: Kit Pastoral 2026

## 1. Dados Gerais da Operação
- **Nicho:** Religião / Liderança Cristã / Recursos Ministeriais (Evergreen)
- **Subnicho:** Esboços de Sermões, Estudos Bíblicos, Dinâmicas e Gestão Eclesiástica
- **Público-Alvo:** Pastores, presbíteros, diáconos, líderes de célula e professores de EBD (Faixa etária 30-65 anos, foco mobile extremo)
- **Status da Operação:** `06-trafego-mercurio` (Live no Cloudflare Workers)
- **URL em Produção:** [https://kit-pastoral.codhun.workers.dev](https://kit-pastoral.codhun.workers.dev)
- **Repositório GitHub:** [https://github.com/arivicente/kit-pastoral.git](https://github.com/arivicente/kit-pastoral.git)

---

## 2. Mineração & Concorrentes Validados (Meta Ad Library)
Minerado via Apify Scraper em 05/11/2026:
- **Total de anúncios analisados:** 40
- **Anúncios validados (> 30 dias contínuos no ar):** 22
- **Principais Players:**
  1. *Editora Fonte Viva* — Ângulo da fadiga ministerial: "Você passa horas tentando estruturar um sermão de domingo?"
  2. *Suzana Lima / Ministério Infantil* — Ângulo de alívio e segurança: "Materiais prontos para imprimir e aplicar sem improvisos."
  3. *Fabiana Mendonça / Dinâmicas de Grupo* — Ângulo de engajamento da igreja.

### Principais Pains Identificados:
- Falta de tempo para estudar e estruturar mensagens profundas durante a semana corrida.
- Medo do "branco" no púlpito ou de pregações superficiais e repetitivas.
- Sobrecarga de funções administrativas na congregação deixando pouco tempo pastoral.

---

## 3. Estrutura da Esteira & Precificação (Stripe Live)
A esteira foi formatada no modelo 1-Page contínuo de alta conversão:

| Nível | Item | Preço | Formato | ID Stripe |
| :--- | :--- | :--- | :--- | :--- |
| **Front-End** | Kit Pastoral Completo (100 Esboços + 4 Bônus) | R$ 37,00 | PDF Digital + Acesso Vitalício | `prod_VZjV73LcU37oLk` |
| **Order Bump 1** | Manual de Dinâmicas de Grupo e Quebra-Gelos | R$ 14,90 | E-book PDF | `prod_VZjVjVeN6dcTj1` |
| **Order Bump 2** | Comentários Exegéticos de Difíceis Textos | R$ 19,90 | Caderno de Consulta Rápida | `prod_VZjVebFnKJp835` |

- **Link de Pagamento Live (Pix + Cartão):**
  `https://buy.stripe.com/cNi14n3yzewc87z07R3Je00`
- **Ticket Médio Alvo:** R$ 51,90 a R$ 71,80 (Aproximadamente 40% a 55% de adesão a pelo menos 1 bump).

---

## 4. Criativos Renderizados (Formato 4:5 - 1080x1350)
Os criativos foram gerados e salvos em `public/anuncios/`:

1. **`ad_01_comparativo_4x5.png`**:
   - *Headline:* "Cansado de passar 6 horas preparando esboços de sermão toda semana?"
   - *Gancho:* Comparativo Antes (6 horas de ansiedade) vs Depois (Esboço profundo pronto em 15 minutos).
2. **`ad_02_dinamica_revelada_4x5.png`**:
   - *Headline:* "A dinâmica bíblica que mantém a igreja atenta do início ao fim."
   - *Gancho:* Demonstração visual do material e aplicação prática.
3. **`ad_03_acervo_completo_4x5.png`**:
   - *Headline:* "Acervo Pastoral Completo 2026: 100 Esboços Exegéticos Prontos."
   - *Gancho:* Mockup de capa 3D com selo de acesso imediato no celular por R$ 37,00.

---

## 5. Auditoria de UX & Mobile Atena
- [x] Input font-size fixado em 16px no mobile (evita auto-zoom incômodo do iOS Safari).
- [x] Barra superior com cronômetro de escassez fixo (vidro fosco / glassmorphism).
- [x] Botão de compra com altura mínima de 54px e texto com contraste WCAG AAA.
- [x] Sem redirecionamento externo para plataforma de terceiros (rolagem suave até o checkout).
- [x] Métodos de pagamento: Cartão de Crédito internacional e Pix instantâneo ativos.
