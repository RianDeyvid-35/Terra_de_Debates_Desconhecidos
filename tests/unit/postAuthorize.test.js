it('impede exclusao por usuario nao autor', () => {
  expect(() => {
    postService.deletePost({
      postOwnerId: 1,
      currentUserId: 2
    });
  }).toThrow();
});