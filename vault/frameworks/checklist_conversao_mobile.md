# 📱 Checklist de Conversão Mobile-First

Este checklist sintetiza os aprendizados práticos de auditoria de checkouts como Hotmart, Kiwify e Stripe:

### 1. Tipografia & Layout
- **Font-size de inputs:** Estritamente `>= 16px` (ex: `text-base` no Tailwind). Se for menor (ex: 14px), o iOS faz zoom automático na tela e quebra o enquadramento do usuário.
- **Botão de Ação Primária (CTA):** Altura mínima de `54px` a `56px` com cantos arredondados (`rounded-xl` ou `rounded-2xl`), texto em caixa alta e contraste visual alto.
- **Espaçamento Lateral:** Padding lateral de pelo menos `16px` para evitar que elementos toquem as bordas do smartphone.

### 2. Header & Banner de Checkout
- **Altura máxima no mobile:** Entre `60px` e `80px`. Banners altos demais empurram o formulário para baixo da dobra e reduzem em até 22% a conversão.
- **Top Timer Glassmorphism:** Barra fosca semitransparente fixada no topo com contagem regressiva em tom amarelo/dourado suave (atenção sem agressividade excessiva).

### 3. Order Bumps
- Bumps estilizados com borda tracejada ou destaque suave em amarelo/verde claro.
- Checkbox visível e grande com valor adicional claramente destacado.
- Atualização em tempo real do valor final no botão de CTA antes da finalização.

### 4. Métodos de Pagamento
- Exibição prioritária do Pix com confirmação imediata.
- Campos de cartão enxutos (sem perguntas desnecessárias como endereço completo ou CPF duplo).
