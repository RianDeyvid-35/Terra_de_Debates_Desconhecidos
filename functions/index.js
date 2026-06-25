// functions/index.js (ou [[path]].js)
import ejs from 'ejs';

export async function onRequest(context) {
  // 1. Como a Cloudflare não deixa ler arquivos usando fs.readFileSync, 
  // nós definimos o esqueleto do EJS como uma String/Template literal.
  // (Podes colar aqui todo o HTML/EJS da tua página index.ejs)
  const templateEjs = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title><%= title %></title>
    </head>
    <body>
        <h1>Benvindo ao <%= title %></h1>
        <p>Olá, <%= username %>! Este HTML foi gerado na borda da Cloudflare.</p>
    </body>
    </html>
  `;

  // 2. O motor do EJS processa os teus dados em memória na hora
  const htmlRenderizado = ejs.render(templateEjs, {
    title: "Terra de Debates Desconhecidos",
    username: "Estudante da Católica"
  });

  // 3. Devolvemos uma resposta HTTP nativa contendo o HTML processado
  return new Response(htmlRenderizado, {
    headers: { 
      'content-type': 'text/html;charset=UTF-8' 
    }
  });
}