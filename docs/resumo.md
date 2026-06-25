## Alunos: 
- Gustavo Henrique de Morais
- Hugo May Neto
- José Manoel Joenk
- Rian Deyvid

---

## Entidades: 
User
id: int
name: string
email: string
password: string

Post
id: int
title: string
content: string
fk_user: int

Comment
id: int
content: string
fk_post: int
fk_user: int

---

## Requisitos Funcionais
RF01 - O sistema deve permitir cadastro de usuário.
RF02 - O sistema deve permitir login.
RF03 - O sistema deve permitir logout.
RF04 - Usuários autenticados devem ser capazes de criar postagens.
RF05 - O sistema deve listar postagens.
RF06 - O sistema deve exibir uma postagem específica.
RF07 - Usuários autenticados devem ser capazes de comentar em postagens.
RF08 - Usuários devem poder excluir apenas suas próprias postagens.

## Requisitos Não Funcionais
RNF01 - Sistema desenvolvido em Node.js e Express.
RNF02 - Testes automatizados usando Vitest e Supertest.
RNF03 - Controle de sessão usando express-session.
RNF04 - Cobertura de testes disponível.
RNF05 - Execução automática dos testes via Github Actions.

## Regras de Negócio
RN01 - Não permitir e-mail duplicado.
RN02 - Não permitir comentário vazio.
RN03 - Usuário não autenticado não pode postar.
RN04 - Usuário não autenticado não pode comentar.
RN05 - Usuário não pode excluir postagem de outro usuário.

---

## Histórias de Usuário

### HU01 – Criar postagem (História principal)

Como estudante, quero criar uma postagem em um fórum para tirar dúvidas ou propor discussões, e quero que outros usuários possam comentar.

Critérios de Aceite
- O usuário deve estar autenticado.
- Deve ser possível informar título e conteúdo da postagem.
- A postagem criada deve aparecer na listagem de postagens.
- Usuários não autenticados não podem criar postagens.

### HU02 – Cadastrar conta

Como estudante, quero criar uma conta no sistema para participar das discussões do fórum.

Critérios de Aceite
- O usuário deve informar nome, e-mail e senha.
- O sistema não deve permitir e-mails duplicados.
- Após o cadastro, o usuário poderá realizar login.

### HU03 – Realizar login

Como estudante cadastrado, quero realizar login para acessar as funcionalidades restritas do fórum.

Critérios de Aceite
- O usuário deve informar e-mail e senha válidos.
- O sistema deve criar uma sessão autenticada.
- Usuários com credenciais inválidas não devem conseguir acessar áreas protegidas.

### HU04 – Comentar uma postagem

Como estudante, quero comentar uma postagem para responder dúvidas ou contribuir com a discussão.

Critérios de Aceite
- O usuário deve estar autenticado.
- O comentário deve estar associado à postagem selecionada.
- Comentários vazios devem ser rejeitados.
- O comentário deve ser exibido na página da postagem.

### HU05 – Excluir minha própria postagem

Como autor de uma postagem, quero excluir minha publicação quando ela não for mais necessária.

Critérios de Aceite
- Apenas o autor da postagem pode excluí-la.
- Usuários não podem excluir postagens de outros usuários.
- Após a exclusão, a postagem não deve mais aparecer na listagem.
- O sistema deve informar quando a operação não for permitida.

---

## Rotas
GET /

GET /register
POST /register

GET /login
POST /login
POST /logout

GET /posts
GET /posts/new
POST /posts
GET /posts/:id
POST /posts/:id/comments
POST /posts/:id/delete

GET /api/posts
GET /api/posts/:id

---

## Casos de Uso

### UC01 - Cadastrar Usuário
Ator: Visitante

Fluxo:
1 - Acessa cadastro
2 - Preenche dados
3 - Sistema cria usuário

Exceção:
- E-mail já cadastrado

### UC02 - Login
Ator: Usuário

Fluxo:
1 - Informa email
2 - Informa senha
3 - Sistema cria sessão


### UC03 - Criar Postagem
Ator: Usuário autenticado

Fluxo:
1 - Abre formulário
2 - Digita título
3 - Digita conteúdo
4 - Sistema salva postagem

### UC04 - Comentar Postagem
Ator: Usuário autenticado

Fluxo:
1 - Abre postagem
2 - Escreve comentário
3 - Sistema salva comentário

Exceção:
- Comentário vazio

### UC05 - Excluir Própria Postagem
Ator: Dono da postagem

Fluxo:
1 - Clica em excluir
2 - Sistema remove postagem

Exceção:
- Usuário não é o dono

---

