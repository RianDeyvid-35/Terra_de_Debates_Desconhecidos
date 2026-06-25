it('rejeita comentario vazio', () => {
  expect(() => {
    commentService.create({
      content: ''
    });
  }).toThrow();
});