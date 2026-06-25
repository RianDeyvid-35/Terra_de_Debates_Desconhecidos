import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import app from '../../src/app.js';
import database from '../../src/database/database.js';

describe('Terras de Debates Desconhecidos', () => {
  beforeEach(() => {
    database.reset();
  });

  it('cadastra usuario valido', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'Morshu',
        email: 'morshu@rupee.com',
        password: 'bombs123'
      });

    expect(response.status).toBe(201);
  });

  it('impede cadastro com e-mail duplicado', async () => {
    await request(app)
      .post('/register')
      .send({
        name: 'Morshu',
        email: 'morshu@rupee.com',
        password: 'bombs123'
      });

    const response = await request(app)
      .post('/register')
      .send({
        name: 'Corvinho',
        email: 'morshu@rupee.com',
        password: 'heehoo321'
      });

    expect(response.status).toBe(400);
  });

  it('login valido cria sessao', async () => {
    await request(app)
      .post('/register')
      .send({
        name: 'Morshu',
        email: 'morshu@rupee.com',
        password: 'bombs123'
      });

    const response = await request(app)
      .post('/login')
      .send({
        email: 'morshu@rupee.com',
        password: 'bombs123'
      });

    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('usuario logado cria postagem', async () => {
    const agent = request.agent(app);

    await agent.post('/register').send({
        name: 'Morshu',
        email: 'morshu@rupee.com',
        password: 'bombs123'
    });

    await agent.post('/login').send({
        email: 'morshu@rupee.com',
        password: 'bombs123'
    });

    const response = await agent.post('/posts').send({
      title: 'Bombs? You want it?',
      content: 'Its yours, my friend. As long as you have enough rupees!'
    });

    expect(response.status).toBe(201);
  });

  it('usuario nao logado nao cria postagem', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        title: 'Sorry Link, I cant give credit',
        content: 'Come back when youre a little, hummm, richer.'
      });

    expect(response.status).toBe(401);
  });

  it('comentario vazio e rejeitado', async () => {
    const agent = request.agent(app);

    await agent.post('/register').send({
        name: 'Morshu',
        email: 'morshu@rupee.com',
        password: 'bombs123'
    });

    await agent.post('/login').send({
        email: 'morshu@rupee.com',
        password: 'bombs123'
    });

    const post = await agent.post('/posts').send({
      title: 'Lamp oil, rope?',
      content: 'Bombs?'
    });

    const response = await agent
      .post(`/posts/${post.body.id}/comments`)
      .send({
        content: ''
      });

    expect(response.status).toBe(400);
  });

  it('outro usuario comenta em uma postagem', async () => {
    const autor = request.agent(app);
    const visitante = request.agent(app);

    await autor.post('/register').send({
        name: 'Morshu',
        email: 'morshu@rupee.com',
        password: 'bombs123'
    });

    await autor.post('/login').send({
        email: 'morshu@rupee.com',
        password: 'bombs123'
    });

    const post = await autor.post('/posts').send({
      title: 'Enough Rupees',
      content: 'Hummmmmm'
    });

    await visitante.post('/register').send({
        name: 'Corvinho',
        email: 'corvo@dancinhas.com',
        password: 'heehoo321'
    });

    await visitante.post('/login').send({
      email: 'corvo@dancinhas.com',
      password: 'heehoo321'
    });

    const response = await visitante
      .post(`/posts/${post.body.id}/comments`)
      .send({
        content: 'Hee!'
      });

    expect(response.status).toBe(201);
  });

  it('usuario nao pode excluir postagem de outro usuario', async () => {
    const autor = request.agent(app);
    const visitante = request.agent(app);

    await autor.post('/register').send({
        name: 'Morshu',
        email: 'morshu@rupee.com',
        password: 'bombs123'
    });

    await autor.post('/login').send({
        email: 'morshu@rupee.com',
        password: 'bombs123'
    });

    const post = await autor.post('/posts').send({
      title: 'Its yours',
      content: 'My friend'
    });

    await visitante.post('/register').send({
      name: 'Corvinho',
      email: 'corvo@dancinhas.com',
      password: 'heehoo321'
    });

    await visitante.post('/login').send({
      email: 'corvo@dancinhas.com',
      password: 'heehoo321'
    });

    const response = await visitante.post(
      `/posts/${post.body.id}/delete`
    );

    expect(response.status).toBe(403);
  });
});