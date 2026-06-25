// functions/[[path]].js
import ejs from 'ejs';

export async function onRequest(context) {
  try {
    // 1. Em vez de usar o 'import' que quebra a build, usamos o fetch nativo
    // do Cloudflare Pages para ler o arquivo index.ejs como texto puro
    const urlTemplate = new URL('../views/index.ejs', context.request.url);
    const respostaTemplate = await context.env.ASSET.fetch(urlTemplate);
    
    if (!respostaTemplate.ok) {
      return new Response("Arquivo index.ejs não foi encontrado na pasta views.", { status: 404 });
    }

    const templateEjs = await respostaTemplate.text();

    // 2. O motor do EJS processa o texto do arquivo .ejs normalmente em memória
    const htmlRenderizado = ejs.render(templateEjs, {
      title: "Terra de Debates Desconhecidos",
      username: "Rian"
      // Adiciona aqui as variáveis que o teu index.ejs costuma pedir
    });

    // 3. Devolve o HTML processado para o navegador
    return new Response(htmlRenderizado, {
      headers: { 'content-type': 'text/html;charset=UTF-8' }
    });

  } catch (error) {
    return new Response(`Erro ao renderizar EJS na Cloudflare: ${error.message}`, { status: 500 });
  }
}