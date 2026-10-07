# OW Map Master

Guia bilíngue e pesquisável dos principais mapas PvP de Overwatch.

## Estado atual

> **MVP funcional implementado em 07/10/2026.** O produto entra agora em validação publicada; novas features ficam congeladas até QA real.

## O que já funciona

- biblioteca de 30 mapas principais;
- filtros por modo e estilo;
- busca por nome/local/estilo;
- detalhe por mapa;
- objetivo e plano de revisão por modo;
- fila pessoal de estudo em localStorage;
- deep links por mapa/filtros/idioma;
- PT-BR padrão + EN;
- mobile;
- Sobre, Privacidade e Termos;
- SEO básico, robots e sitemap;
- live-update;
- GitHub Pages;
- Browser E2E desktop/mobile.

## Cobertura inicial

- 7 Controle;
- 8 Escolta;
- 8 Híbridos;
- 4 Avanço;
- 3 Flashpoint.

A biblioteca inclui Neon Junction e Aatlis e marca New Junk City/Suravasa como reformulados.

## Fontes

Veja `DATA_SOURCES.md`.

O produto deve ser tratado como conteúdo live-service: antes de afirmar que um mapa está em uma fila competitiva específica, confirme fontes atuais.

## QA

```bash
npm install
npm run check
npm run test:e2e
```

O QA valida:

- total e distribuição dos mapas;
- IDs únicos;
- filtros;
- busca;
- abertura do guia;
- fila de estudo;
- persistência local;
- deep links;
- PT-BR/EN;
- desktop e mobile.

## Gate antes de V2

- [x] MVP navegável;
- [x] mobile;
- [x] PT-BR/EN;
- [x] busca/filtros;
- [x] fila de estudo;
- [x] QA/E2E;
- [x] Pages preparado;
- [ ] confirmar Actions verdes;
- [ ] confirmar Pages publicado;
- [ ] revisar visual desktop/mobile publicado;
- [ ] validar os 30 mapas e os textos com jogadores reais;
- [ ] corrigir somente P0/P1 encontrados.

## V2 — somente após validação

- imagens oficiais/licenciadas por mapa;
- mapa visual/anotações por ponto;
- rotas por função;
- favoritos/notas por herói;
- quizzes de mapa;
- atualização de pool competitivo por temporada;
- compartilhamento de coleção/estudo.

## Compliance

Projeto independente e não afiliado ou endossado pela Blizzard Entertainment.
