# XNMAB static portfolio

Estrutura para publicar vários sites estáticos em um domínio principal.

## Rotas

- `/` - portfólio principal em `index.html`
- `/pixels/` - site da Pixel Comunicação Visual

## Como adicionar um novo site

1. Crie uma pasta na raiz com o nome da rota, por exemplo `barbearia`.
2. Coloque dentro dela o `index.html`, `styles.css`, `script.js` e os assets do site.
3. Adicione um novo card do projeto no `index.html` principal.
4. Use links absolutos para rotas públicas, por exemplo `/barbearia/`.

Cada site deve manter seus próprios arquivos dentro da própria pasta para evitar conflito de estilos, scripts e imagens.
