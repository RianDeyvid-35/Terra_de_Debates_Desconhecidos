# Matriz de Ferramentas

| Ferramenta         | Camada              | Testa o quê?                          | Substitui?                         | Melhor uso
| Vitest + Supertest | Unitário/API        | Funções, serviços e rotas HTTP        | Base do projeto                    | APIs Node.js/Express
| Jest               | Unitário/Integração | Funções, serviços e integração        | Substitui parcialmente o Vitest    | Projetos JavaScript tradicionais
| Playwright         | E2E/Interface       | Fluxos completos no navegador         | Complementa                        | Login, cadastro e jornadas de usuário
| Cypress            | E2E/Interface       | Interface web e ações do usuário      | Complementa                        | Testes visuais e fluxos web
| Testing Library    | Componentes/UI      | Comportamento de componentes          | Complementa                        | Front-end componentizado
| Postman/Newman     | API                 | Requisições HTTP e coleções de testes | Substitui parcialmente o Supertest | Testes de API independentes da linguagem
| k6                 | Carga/Performance   | Volume, latência e estabilidade       | Complementa                        | Testes de desempenho
| OWASP ZAP          | Segurança           | Vulnerabilidades web básicas          | Complementa                        | Segurança em ambiente autorizado
| GitHub Actions     | Pipeline            | Execução automatizada da suíte        | Complementa                        | Integração contínua

## Vitest + Supertest

1. Para que serve?
Executar testes unitários, integração e APIs em aplicações Node.js.

2. Que tipo de teste atende?
Unitário, Integração, API

3. Camada da pirâmide
Base e meio da pirâmide.

4. Testa
Backend, API

5. Substitui Vitest + Supertest?
É a ferramenta principal do projeto.

6. Exige mudança?
Não.

7. Instalação básica
npm install -D vitest supertest

8. Exemplo mínimo
```javascript
import request from "supertest";
import { describe, it, expect } from "vitest";

it("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
});
```

9. Evidência produzida
Relatório de testes, Cobertura, Logs de execução

10. Vantagens no projeto
Integração direta com Express, Rápido, Atende os requisitos da disciplina.

11. Desvantagens
Não testa navegador real.

## Jest

1. Para que serve?
Framework de testes JavaScript.

2. Que tipo de teste atende?
Unitário, Integração

3. Camada da pirâmide
Base e meio.

4. Testa
Backend, Frontend

5. Substitui Vitest + Supertest?
Parcialmente.

6. Exige mudança?
Troca do Vitest.

7. Instalação
npm install -D jest

8. Exemplo
```javascript
test("soma", () => {
  expect(1 + 1).toBe(2);
});
```

9. Evidência
Relatórios, Cobertura

10. Vantagens
Muito difundido.

11. Desvantagens
Mais lento que Vitest.

## Playwright

1. Para que serve?
Automação de navegador e testes E2E.

2. Tipo de teste
E2E

3. Camada
Topo da pirâmide.

4. Testa
Frontend, Interface

5. Substitui?
Não.

6. Exige mudança?
Não.

7. Instalação
npm init playwright@latest

8. Exemplo
```javascript
test("login", async ({ page }) => {
  await page.goto("http://localhost:3000");
});
```

9. Evidência
Screenshots, Vídeos, Relatórios HTML

10. Vantagens
Simula usuário real.

11. Desvantagens
Mais lento.

## Cypress

1. Para que serve?
Testes E2E em aplicações web.

2. Tipo
E2E

3. Camada
Topo da pirâmide.

4. Testa
Frontend, Interface

5. Substitui?
Não.

6. Exige mudança?
Não.

7. Instalação
npm install cypress --save-dev

8. Exemplo
```javascript
describe("Login", () => {
  it("abre página", () => {
    cy.visit("/");
  });
});
```

9. Evidência
Vídeos, Capturas de tela
10. Vantagens

Interface amigável.
11. Desvantagens
Mais pesado para projetos pequenos.

## Testing Library

1. Para que serve?
Testar componentes pela perspectiva do usuário.

2. Tipo
Componentes, UI

3. Camada
Meio da pirâmide.

4. Testa
Frontend

5. Substitui?
Não.

6. Exige mudança?
Normalmente requer React, Vue ou Angular.

7. Instalação
npm install @testing-library/dom

8. Exemplo
```javascript
screen.getByText("Entrar");
```
9. Evidência
Relatórios, Cobertura

10. Vantagens
Foco no comportamento.

11. Desvantagens
Pouco útil em EJS puro.

## Postman/Newman

1. Para que serve?
Testar APIs via coleções.

2. Tipo
API

3. Camada
Integração.

4. Testa
Backend, API

5. Substitui?
Parcialmente Supertest.

6. Exige mudança?
Não.

7. Instalação
npm install -g newman

8. Exemplo
newman run collection.json

9. Evidência
Relatórios HTML, Logs

10. Vantagens
Independente da linguagem.

11. Desvantagens
Não integra tão bem ao código quanto Supertest.

## k6

1. Para que serve?
Testes de carga e performance.

2. Tipo
Performance

3. Camada
Fora da pirâmide tradicional.

4. Testa
Backend, API

5. Substitui?
Não.

6. Exige mudança?
Não.

7. Instalação
brew install k6

8. Exemplo
```javascript
import http from "k6/http";

export default function () {
  http.get("http://localhost:3000");
}
```
9. Evidência
Métricas, Latência, Throughput

10. Vantagens
Mede desempenho real.

11. Desvantagens
Não valida regras de negócio.

## OWASP ZAP

1. Para que serve?
Análise de vulnerabilidades web.

2. Tipo
Segurança

3. Camada
Complementar.

4. Testa
Segurança

5. Substitui?
Não.

6. Exige mudança?
Não.

7. Instalação
Download da aplicação OWASP ZAP

8. Exemplo
Executar scan automatizado na URL da aplicação.

9. Evidência
Relatórios de vulnerabilidade

10. Vantagens
Detecta falhas básicas.

11. Desvantagens
Não substitui testes funcionais.

## GitHub Actions

1. Para que serve?
Automação de pipelines CI/CD.

2. Tipo
Pipeline

3. Camada
Suporte à pirâmide.

4. Testa
Pipeline

5. Substitui?
Não.

6. Exige mudança?
Não.

7. Instalação
Arquivo:
.github/workflows/tests.yml

8. Exemplo
name: Tests

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest

9. Evidência
Histórico de execuções, Logs, Status de build

10. Vantagens
Execução automática dos testes.

11. Desvantagens
Não executa testes sozinho, depende de outras ferramentas.