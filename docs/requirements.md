# Requirements - NextEp

## Objetivo
Plataforma web MVP responsiva para descoberta de séries em alta e controle prático de episódios assistidos, preenchendo o vácuo deixado pelo encerramento do TV Time.

## Público-Alvo
Entusiastas de cultura pop e antigos usuários do TV Time que precisam de uma ferramenta rápida, limpa e direta para organizar seu consumo de mídia.

## User Stories
* Como usuário, quero visualizar as séries em alta (Trending) na página inicial para descobrir novos conteúdos.
* Como usuário, quero pesquisar uma série pelo nome em uma barra de busca para encontrar informações específicas.
* Como usuário, quero acessar a página de uma série para ler a sinopse e visualizar a lista de episódios divididos por temporada.
* Como usuário, quero clicar em um botão de check nos episódios para marcá-los como assistidos e salvar meu progresso localmente.

## Critérios de Aceitação
* A barra de busca deve trazer resultados reais consumindo a API do TMDB.
* O estado visual do episódio deve mudar claramente quando marcado como assistido.
* O progresso do usuário deve ser salvo no `localStorage` para não ser perdido ao recarregar a página.
* A interface deve ser responsiva e utilizável em dispositivos móveis.

## Estados da Aplicação
* **Loading:** Exibição de indicador visual (spinner ou skeleton) enquanto aguarda a resposta da API do TMDB.
* **Empty State:** Mensagem amigável de "Nenhuma série encontrada" caso a busca não retorne resultados.
* **Error:** Alerta visual amigável caso a requisição à API falhe ou o usuário esteja sem internet.
* **Success:** Renderização completa dos componentes com os dados da série ou episódios.

## Regras do Produto
* O sistema não exigirá login ou criação de conta para o MVP; os dados pertencerão ao dispositivo do usuário.
* O consumo de dados será feito exclusivamente via TMDB API.