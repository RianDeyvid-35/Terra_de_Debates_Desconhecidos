# Plano de Teste

## Objetivo

Garantir que as funcionalidades principais do Fórum Acadêmico funcionem corretamente, respeitando os requisitos funcionais, regras de negócio, autenticação e autorização definidos para o projeto.
Os testes têm como objetivo validar o comportamento do sistema desde o desenvolvimento inicial, seguindo a abordagem TDD (Test Driven Development) e o princípio Shift-Left.

---

## Escopo dos Testes

Serão testadas as seguintes funcionalidades:
- Cadastro de usuário;
- Login e logout;
- Criação de postagens;
- Listagem de postagens;
- Visualização de postagem;
- Comentários em postagens;
- Exclusão de postagens;
- Regras de autenticação;
- Regras de autorização;
- Endpoints da API.

Não fazem parte do escopo:
- Testes de carga;
- Testes de segurança avançados;
- Testes de usabilidade;
- Testes de compatibilidade entre navegadores.

---

## Estratégia de Teste

O projeto utilizará testes automatizados em diferentes níveis:

### Testes Unitários

Responsáveis por validar regras de negócio e comportamentos isolados dos serviços.
Exemplos:

- Verificar e-mail duplicado;
- Validar criação de postagem;
- Rejeitar comentário vazio;
- Verificar autorização para exclusão de postagem.

### Testes de Integração/API

Responsáveis por validar o funcionamento das rotas HTTP e integração entre camadas da aplicação.

Ferramentas:
- Vitest;
- Supertest.

Exemplos:
- Cadastro de usuário;
- Login;
- Criação de postagem;
- Comentários;
- Exclusão de postagem.

### Testes de Regressão

Responsáveis por garantir que funcionalidades já implementadas continuem funcionando após alterações no sistema.

Casos priorizados:
- Bloqueio de e-mail duplicado;
- Restrição para exclusão de postagem de outro usuário.

---

## Riscos Prioritários

ID  | Risco                                     | Impacto
R01 | Cadastro com e-mail duplicado             | Alto
R02 | Usuário não autenticado criar postagem    | Alto
R03 | Usuário não autenticado comentar          | Alto
R04 | Comentário vazio ser aceito               | Médio
R05 | Usuário excluir postagem de outro usuário | Alto
R06 | Falha na criação da sessão após login     | Alto

---

## Casos de Teste Prioritários

CT01
Cadastrar usuário válido.

CT02
Impedir cadastro com e-mail duplicado.

CT03
Login válido cria sessão.

CT04
Usuário logado cria postagem.

CT05
Usuário não logado não cria postagem.

CT06
Comentário vazio é rejeitado.

CT07
Outro usuário comenta em uma postagem.

CT08
Usuário não pode excluir postagem de outro usuário.