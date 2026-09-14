# Architecture - NextEp

## Páginas e Rotas (React Router)
* `/` (Home): Exibe a lista de séries em alta (Trending).
* `/search`: Exibe os resultados baseados na query de busca do usuário.
* `/tv/:id`: Rota dinâmica que exibe os detalhes, sinopse e lista de temporadas de uma série específica.

## Componentes Principais e Props
* `Navbar`: Cabeçalho fixo contendo a logo e o input de pesquisa.
* `MediaCard`: Card reaproveitável de exibição do pôster. 
  * Props: `id` (number), `title` (string), `posterPath` (string).
* `SeasonList`: Container que agrupa os episódios de uma temporada.
  * Props: `seasonNumber` (number), `episodes` (array).
* `EpisodeItem`: Linha individual de cada episódio.
  * Props: `episodeId` (number), `name` (string), `isWatched` (boolean), `onToggleWatch` (function).

## Estados do React (useState)
* `trendingSeries`: Array armazenando as séries em alta carregadas na Home.
* `searchResults`: Array armazenando os resultados da busca do usuário.
* `searchQuery`: String que controla o texto atual do input de busca.
* `watchedEpisodes`: Array de IDs (numbers) representando os episódios já marcados como vistos pelo usuário.

## Efeitos (useEffect)
* **Home:** Dispara um `fetch` para o endpoint `/trending/tv/week` do TMDB ao montar o componente.
* **Detalhes da Série:** Observa a mudança do parâmetro `:id` da URL e dispara um `fetch` para buscar os detalhes e temporadas da série específica.
* **Persistência:** Observa alterações no estado `watchedEpisodes` e atualiza o `localStorage` do navegador para salvar o progresso.