<div align="center">
  <h1>🗺️ OW Map Master</h1>
  <p><strong>Biblioteca bilíngue de mapas de Overwatch para estudar objetivos, modos e planos de jogo.</strong></p>
  <p><img alt="Status" src="https://img.shields.io/badge/status-MVP%20em%20valida%C3%A7%C3%A3o-64748b"> <img alt="Idiomas" src="https://img.shields.io/badge/idiomas-PT--BR%20%2F%20EN-2563eb"></p>
  <p><a href="DATA_SOURCES.md"><strong>Fontes e atualizações</strong></a> · <a href="#desenvolvimento"><strong>Executar localmente</strong></a></p>
</div>

## Como usar

1. Busque um mapa por nome, estilo ou modo de jogo.
2. Confira objetivos e pontos de atenção.
3. Abra o guia e acrescente o mapa à sua fila de estudo.
4. Retorne à lista nos próximos treinos.

O MVP documenta **30 mapas** em uma biblioteca inicial com cinco categorias de modos: Controle, Escolta, Híbrido, Avanço e Flashpoint. Os guias servem para estudo e **não afirmam que todos esses mapas estão na rotação competitiva atual**.

| Funcionalidade | Dados |
| --- | --- |
| Biblioteca de mapas | Catálogo curado em `maps.js` |
| Busca e filtros | Nome, modo e características |
| Guia | Objetivos e proposta de revisão |
| Fila pessoal | Salva no `localStorage` |
| Compartilhamento | Links com mapa, filtros e idioma |
| Testes | QA estático e cenários de navegador |

## Desenvolvimento

```bash
git clone https://github.com/HelioConde/ow-map-master.git
cd ow-map-master
python -m http.server 8000
```

Abra `http://localhost:8000`. Para QA:

```bash
npm install
npm run check
npm run test:e2e
```

## Fontes e limites

Overwatch recebe atualizações frequentes. **A biblioteca é um snapshot de conteúdo**, não uma consulta ao vivo da rotação de mapas. Consulte o arquivo [DATA_SOURCES.md](DATA_SOURCES.md) para critérios de manutenção e atualização.

**Status:** MVP funcional documentado, com validação publicada e feedback real ainda necessários antes de expandir. A ferramenta não é associada à Blizzard Entertainment.

Criado por [Hélio Conde](https://github.com/HelioConde).


## GitHub Pages — pré-requisito de publicação

O monitor de 25/10/2026 confirmou testes de qualidade aprovados, mas o deploy foi bloqueado com `Resource not accessible by integration` ao tentar criar o GitHub Pages automaticamente. Essa configuração requer acesso administrativo, não código JavaScript.

Agora o workflow separa as etapas: `check` valida a aplicação estática, `pages-ready` verifica se o Pages já está habilitado e `deploy` publica apenas HTML/CSS/JS/JSON/robots/sitemap após ambos os critérios passarem. **Um QA verde com deploy pulado não significa site online.**

Para finalizar a configuração **uma vez**, abra **Settings → Pages → Build and deployment → Source: GitHub Actions**. Em seguida execute o workflow manualmente ou faça novo push na `main`. Nenhuma conta ou banco de dados é necessário: a fila de estudo permanece somente no `localStorage` do navegador.
