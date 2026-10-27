# OW Map Master — Design System

## Propósito
Guia de mapas de Overwatch em PT-BR/EN, em uma interface estática sem conta, banco de dados ou API obrigatória. A identidade gráfica combina fundo grafite, acentos laranja e azul, cartões e tipografia de alto contraste.

## 1. Taste Skill — tokens
Os valores estão implementados em `style.css`:
- Cor base `--bg:#10131a`, superfícies `--panel:#171c26` e `--panel2:#1d2430`.
- Texto `--ink:#f5f7fb`, secundário `--muted:#98a4b6`, borda `--line:#303949`.
- Cor de ação `--accent:#f09a49`, azul `--blue:#61aafc`, positivo `--good:#75d1a3`.
- Foco `--focus:#ffce78` com anel visível de 3px e deslocamento de 3px.
- Espaçamentos `--space-1/2/3/4/6/8` equivalentes a 4/8/12/16/24/32px.
- Raios `--radius-control:10px`, `--radius-card:18px`.
- Todo botão principal: pelo menos 44px de altura, rótulo textual e feedback.

## 2. Web Design Guidelines
- Link “Pular para o conteúdo” nas páginas inicial, Sobre, Privacidade e Termos; navegação por teclado sem aprisionar foco.
- Indicadores de status não dependem somente de cor. Labels explícitas para busca e filtros.
- Redução de movimento: `prefers-reduced-motion:reduce` desliga efeitos e rolagem suave.
- Metadados, idioma e tamanho mínimo de viewport preservados.
- Mobile: revisar 320, 390, 768, 1366 e 1600px, garantindo que botões e filtros não ultrapassem a tela.
- Acessibilidade deve ser verificada em browser real; testes de DOM sozinhos não equivalem a auditoria WCAG completa.

## 3. Awesome Design
- Valor prioritário: localizar rapidamente modo, mapa e fila de estudo.
- Ordem: título → filtros → biblioteca → guia → ações de salvar → informações legais.
- Diferenciar estado selecionado, loading/empty state e indisponibilidade sem usar apenas cor.
- Preservar conteúdo factual curado e avisos de que os mapas podem mudar após patches.

## 4. Image to Code
Nenhuma referência visual aprovada foi fornecida para reprodução exata. O projeto mantém a identidade atual e documenta componentes editáveis. Para uma futura reconstrução a partir de screenshots:
1. Salvar capturas antes/depois com mesmo viewport.
2. Conferir tipografia, espaçamento, cores, raio, ícones, cards e responsividade.
3. Implementar em HTML/CSS real, nunca como uma imagem plana do layout.
4. Validar navegação, filtros, idioma, favoritos e foco no Playwright.

## 5. Playwright e GitHub Pages
`npm run check` e `npm run test:e2e` exercitam lógica e navegação. O workflow de Pages só publica após validação e após o administrador habilitar Source: GitHub Actions. Os favoritos ficam somente em `localStorage`, sem banco de dados ou sincronização entre dispositivos.
