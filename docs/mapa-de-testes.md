# Mapa de Testes

## Objetivo

Relacionar as histórias de usuário, requisitos e regras de negócio aos testes automatizados planejados para o sistema.
O mapa de testes serve como guia para a aplicação de TDD, permitindo identificar quais comportamentos serão validados antes da implementação das funcionalidades.

---

### HU01 – Criar Postagem

História:
Como estudante, quero criar uma postagem em um fórum para tirar dúvidas ou propor discussões, e quero que outros usuários possam comentar.

Requisitos Relacionados
- RF04 – Criar postagem
- RF05 – Listar postagens
- RN03 – Usuário não autenticado não pode postar

Testes Planejados
ID  | Tipo           | Teste
T01 | Integração/API | Usuário logado cria postagem
T02 | Integração/API | Usuário não logado não cria postagem
T03 | Unitário       | Criação de postagem válida

Ciclo TDD:
Ciclo 2

---

### HU02 – Cadastrar Conta

História:
Como estudante, quero criar uma conta no sistema para participar das discussões do fórum.

Requisitos Relacionados
- RF01 – Cadastro de usuário
- RN01 – Não permitir e-mail duplicado

Testes Planejados

ID  | Tipo           | Teste
T04 | Integração/API | Cadastra usuário válido
T05 | Integração/API | Impede cadastro com e-mail duplicado
T06 | Unitário       | Validação de e-mail duplicado

Ciclo TDD:
Ciclo 1

---

### HU03 – Realizar Login

História:
Como estudante cadastrado, quero realizar login para acessar as funcionalidades restritas do fórum.

Requisitos Relacionados
- RF02 – Login
- RF03 – Logout

Testes Planejados
ID  | Tipo           | Teste
T07 | Integração/API | Login válido cria sessão

Ciclo TDD:
Ciclo 1

---

### HU04 – Comentar Postagem

História:
Como estudante, quero comentar uma postagem para responder dúvidas ou contribuir com a discussão.

Requisitos Relacionados
- RF07 – Comentar postagem
- RN02 – Não permitir comentário vazio
- RN04 – Usuário não autenticado não pode comentar

Testes Planejados
ID  | Tipo           | Teste
T08 | Integração/API | Comentário vazio é rejeitado
T09 | Integração/API | Outro usuário comenta em uma postagem
T10 | Unitário       | Rejeita comentário vazio

Ciclo TDD:
Ciclo 3

---

### HU05 – Excluir Minha Própria Postagem

História:
Como autor de uma postagem, quero excluir minha publicação quando ela não for mais necessária.

Requisitos Relacionados
- RF08 – Excluir postagem
- RN05 – Usuário não pode excluir postagem de outro usuário

Testes Planejados
TD  | Tipo           | Teste
T11 | Integração/API | Usuário não pode excluir postagem de outro usuário
T12 | Unitário       | Impede exclusão por usuário não autorizado

Ciclo TDD:
Ciclo 3

---

### Resumo dos Testes

Testes Unitários
- T03 – Criação de postagem válida
- T06 – Validação de e-mail duplicado
- T10 – Rejeita comentário vazio
- T12 – Impede exclusão por usuário não autorizado

Total: 4 testes unitários

---

Testes de Integração/API
- T01 – Usuário logado cria postagem
- T02 – Usuário não logado não cria postagem
- T04 – Cadastra usuário válido
- T05 – Impede cadastro com e-mail duplicado
- T07 – Login válido cria sessão
- T08 – Comentário vazio é rejeitado
- T09 – Outro usuário comenta em uma postagem
- T11 – Usuário não pode excluir postagem de outro usuário

Total: 8 testes de integração/API

---

Casos Negativos
- T02 – Usuário não logado não cria postagem
- T05 – Impede cadastro com e-mail duplicado
- T08 – Comentário vazio é rejeitado
- T11 – Usuário não pode excluir postagem de outro usuário

Total: 4 casos negativos

---

Testes de Regressão
- T05 – Impede cadastro com e-mail duplicado
- T11 – Usuário não pode excluir postagem de outro usuário

Total: 2 testes de regressão

---

Teste de Autenticação
- T07 – Login válido cria sessão

---

Teste de Autorização
- T11 – Usuário não pode excluir postagem de outro usuário
