it('rejeita email duplicado', () => {
  expect(() => {
    userService.create({
      email: 'corvo@dancinhas.com'
    });
  }).toThrow();
});