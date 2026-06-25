# Diário TDD

## Objetivo

Este documento registra a aplicação da abordagem Test Driven Development (TDD) durante o desenvolvimento do Fórum Acadêmico.

Para cada ciclo foi seguida a sequência:
1. Definição da história de usuário;
2. Definição do critério de aceite;
3. Escrita do teste automatizado;
4. Execução do teste com falha (Red);
5. Implementação mínima da funcionalidade;
6. Execução do teste com sucesso (Green);
7. Refatoração quando necessária.

---

### Ciclo TDD 1 – Cadastro de Usuário

História de Usuário:
HU02 – Como estudante, quero criar uma conta no sistema para participar das discussões do fórum.

Critério de Aceite
- O sistema deve permitir cadastro de novos usuários.
- Não deve permitir e-mails duplicados.

Teste Escrito Antes da Implementação
CT02 – Impede cadastro com e-mail duplicado.

Objetivo:
Garantir que dois usuários não possam utilizar o mesmo endereço de e-mail.

Exemplo do teste:
```javascript
it('impede cadastro com e-mail duplicado', async () => {
  // tentativa de cadastrar usuário já existente
});
```

Resultado Inicial
Falha. O sistema ainda não possuía validação para e-mails já cadastrados.

Implementação Mínima
Foi adicionada uma verificação no serviço de usuários para consultar se o e-mail já existia antes da criação do novo cadastro.

Resultado Após Implementação
Sucesso. O sistema passou a retornar erro quando o e-mail já estava cadastrado.

Refatoração
A validação foi movida para a camada de serviço para evitar duplicação de lógica entre controladores.

---

### Ciclo TDD 2 – Criação de Postagem

História de Usuário
HU01 – Como estudante, quero criar uma postagem em um fórum para tirar dúvidas ou propor discussões, e quero que outros usuários possam comentar.

Critério de Aceite
- O usuário deve estar autenticado.
- Deve ser possível informar título e conteúdo.
- A postagem deve ser salva e exibida posteriormente.

Teste Escrito Antes da Implementação
CT04 – Usuário logado cria postagem.

Objetivo:
Garantir que usuários autenticados consigam publicar novas discussões.

Exemplo do teste:
```javascript
it('usuario logado cria postagem', async () => {
  // criação da postagem
});
```

Resultado Inicial
Falha. A rota de criação ainda não existia e nenhuma postagem era persistida.

Implementação Mínima
Foi criada a rota responsável pela criação de postagens e o serviço para armazenamento dos dados.
Também foi adicionado o middleware de autenticação para identificar o usuário logado.

Resultado Após Implementação
Sucesso. Usuários autenticados passaram a criar postagens corretamente.

Refatoração
A lógica de persistência foi separada do controlador para manter a responsabilidade de cada camada bem definida.

---

### Ciclo TDD 3 – Comentários em Postagens

História de Usuário
HU04 – Como estudante, quero comentar uma postagem para responder dúvidas ou contribuir com a discussão.

Critério de Aceite
- O usuário deve estar autenticado.
- Comentários não podem ser vazios.
- O comentário deve ficar associado à postagem.

Teste Escrito Antes da Implementação
CT06 – Comentário vazio é rejeitado.

Objetivo:
Garantir que comentários sem conteúdo não sejam aceitos.

Exemplo do teste:
```javascript
it('comentario vazio e rejeitado', async () => {
  // tentativa de comentar sem conteúdo
});
```

Resultado Inicial
Falha. O sistema aceitava qualquer valor enviado pelo formulário.

Implementação Mínima
Foi adicionada validação para impedir comentários vazios antes da persistência dos dados.

Resultado Após Implementação
Sucesso. Comentários sem conteúdo passaram a ser rejeitados pelo sistema.

Refatoração
A validação foi centralizada na camada de serviço para reutilização futura e melhor manutenção.

---

### Resumo dos Ciclos TDD

Ciclo | História            | Teste Inicial
1     | Cadastro de usuário | Impede cadastro com e-mail duplicado
2     | Criar postagem      | Usuário logado cria postagem
3     | Comentar postagem   | Comentário vazio é rejeitado