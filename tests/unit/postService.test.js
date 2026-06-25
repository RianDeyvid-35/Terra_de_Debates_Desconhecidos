it('cria postagem valida', () => {
  const post = postService.create({
    title: 'Bombs?',
    content: 'You want it?',
    userId: 1
  });

  expect(post.title).toBe('Bombs?');
});