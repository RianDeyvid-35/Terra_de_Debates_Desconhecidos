# Terra de Debates Desconhecidos - Relatório Final

## Identificação da Equipe: 
- Gustavo Henrique de Morais
- Hugo May Neto
- José Manoel Joenk
- Rian Deyvid

- Engenharia de Software 3ª Fase - Teste de Software

---

## Descrição do sistema desenvolvido:

- O sistema desenvolvido foi do tema 1 - Fórum Acadêmico - onde os usuários podem criar conta, realizar login/logout, criar postagens, visualizar postagens, comentar em postagens e excluir apenas as suas próprias postagens. O sistema utiliza Node.js, Express, EJS, sessões e testes automatizados com Vitest e Supertest.

---

## Histórias de Usuário:

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

## Requisitos Funcionais
RF01 - O sistema deve permitir cadastro de usuário.
RF02 - O sistema deve permitir login.
RF03 - O sistema deve permitir logout.
RF04 - Usuários autenticados devem ser capazes de criar postagens.
RF05 - O sistema deve listar postagens.
RF06 - O sistema deve exibir uma postagem específica.
RF07 - Usuários autenticados devem ser capazes de comentar em postagens.
RF08 - Usuários devem poder excluir apenas suas próprias postagens.

---

## Requisitos Não Funcionais
RNF01 - Sistema desenvolvido em Node.js e Express.
RNF02 - Testes automatizados usando Vitest e Supertest.
RNF03 - Controle de sessão usando express-session.
RNF04 - Cobertura de testes disponível.
RNF05 - Execução automática dos testes via Github Actions.

---

## Mapa de Telas

- Home
- Login
- Cadastro
- Nova postagem
- Visualizar postagem
- Editar perfil

---

## Escopo Implementado

- Cadastro
- Login
- Logout
- Sessão
- Criação de postagens
- Listagem
- Visualização
- Comentários
- Exclusão da própria postagem
- Controle de autorização
- API
- Testes unitários
- Testes de integração
- GitHub Actions

---

## Testes unitários

- userService.test.js (Rejeita email duplicado)
- postService.test.js (Cria postagem válida)
- commentService.test.js (Rejeita comentário vazio)
- postAuthorize.test.js (Impede exclusão por usuário não autor)

---

## Testes de integração / API

- Cadastro de usuário válido
- Impede cadastro com email duplicado
- Login válido cria sessão
- Usuário logado cria postagem
- Usuário não logado não cria postagem
- Comentário vazio rejeitado
- Outro usuário comenta em uma postagem
- Usuário não pode excluir postagem de outro usuário

---

## Testes de Regressão

- Impedir e-mail duplicado
- Impedir exclusão de postagem de outro usuário