# Casos de Teste

### CT01 - Cadastrar usuário válido
Campo              | Descrição
ID                 | CT01
Funcionalidade     | Cadastro de usuário
Tipo               | Integração/API
Objetivo           | Verificar que um usuário válido pode ser cadastrado
Pré-condição       | Não existir usuário com o e-mail informado
Passos             | 1 - Acessar cadastro. 2 - Informar nome, e-mail e senha válidos. 3 - Enviar formulário
Resultado Esperado | Usuário cadastrado com sucesso
Prioridade         | Alta


### CT02 - Impedir cadastro com e-mail duplicado
Campo              | Descrição
ID                 | CT02
Funcionalidade     | Cadastro de usuário
Tipo               | Integração/API, Negativo, Regressão
Objetivo           | Garantir que o sistema não aceite dois usuários com o mesmo e-mail
Pré-condição       | Já existir usuário cadastrado com o e-mail informado
Passos             | 1 - Acessar cadastro. 2 - Informar e-mail já utilizado. 3 - Enviar formulário
Resultado Esperado | Cadastro rejeitado com mensagem de erro
Prioridade         | Alta


### CT03 - Login válido cria sessão
Campo              | Descrição
ID                 | CT03
Funcionalidade     | Login
Tipo               | Integração/API, Autenticação
Objetivo           | Verificar que o login cria uma sessão autenticada
Pré-condição       | Usuário cadastrado
Passos             | 1 - Acessar login. 2 - Informar e-mail e senha válidos. 3 - Enviar formulário
Resultado Esperado | Sessão criada com sucesso
Prioridade         | Alta


### CT04 - Usuário logado cria postagem
Campo              | Descrição
ID                 | CT04
Funcionalidade     | Criar postagem
Tipo               | Integração/API
Objetivo           | Verificar que usuários autenticados podem criar postagens
Pré-condição       | Usuário autenticado
Passos             | 1 - Realizar login. 2 - Acessar criação de postagem. 3 - Informar título e conteúdo. 4 - Enviar formulário
Resultado Esperado | Postagem criada e exibida na listagem
Prioridade         | Alta


### CT05 - Usuário não logado não cria postagem
Campo              | Descrição
ID                 | CT05
Funcionalidade     | Criar postagem
Tipo               | Integração/API, Negativo
Objetivo           | Garantir que apenas usuários autenticados criem postagens
Pré-condição       | Nenhuma sessão ativa
Passos             | 1 - Tentar acessar a rota de criação de postagem. 2 - Informar título e conteúdo. 3 - Enviar formulário
Resultado Esperado | Operação bloqueada
Prioridade         | Alta


### CT06 - Comentário vazio é rejeitado
Campo              | Descrição
ID                 | CT06
Funcionalidade     | Comentar postagem
Tipo               | Integração/API, Negativo
Objetivo           | Garantir que comentários sem conteúdo não sejam aceitos
Pré-condição       | Usuário autenticado e postagem existente
Passos             | 1 - Abrir uma postagem. 2 - Deixar o campo de comentário vazio. 3 - Enviar comentário
Resultado Esperado | Comentário rejeitado
Prioridade         | Média


### CT07 - Outro usuário comenta em uma postagem
Campo              | Descrição
ID                 | CT07
Funcionalidade     | Comentar postagem
Tipo               | Integração/API
Objetivo           | Verificar a interação entre usuários por meio dos comentários
Pré-condição       | Existir uma postagem criada por outro usuário
Passos             | 1 - Usuário A cria uma postagem. 2 - Usuário B realiza login. 3 - Usuário B acessa a postagem. 4 - Usuário B envia um comentário
Resultado Esperado | Comentário salvo e exibido na postagem
Prioridade         | Média


### CT08 - Usuário não pode excluir postagem de outro usuário
Campo              | Descrição
ID                 | CT08
Funcionalidade     | Exclusão de postagem
Tipo               | Integração/API, Autorização, Regressão
Objetivo           | Garantir que apenas o autor possa excluir sua própria postagem
Pré-condição       | Existir uma postagem criada por outro usuário
Passos             | 1 - Usuário A cria uma postagem. 2 - Usuário B realiza login. 3 - Usuário B tenta excluir a postagem
Resultado Esperado | Exclusão bloqueada
Prioridade         | Alta


### Resumo
Categoria              | Quantidade
Casos de Teste         | 8
Casos Negativos        | 3 (CT02, CT05, CT06)
Testes de Regressão    | 2 (CT02, CT08)
Testes de Autenticação | 1 (CT03)
Testes de Autorização  | 1 (CT08)
