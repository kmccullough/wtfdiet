export const routes = [
  import('./routes/login.mjs'),
  import('./routes/spa.mjs'),
];
export default routes;

Object.assign(routes, {
  async register(server) {
    (await Promise.all(routes)).forEach(route => {
      route.default(server);
    });
  },
});
