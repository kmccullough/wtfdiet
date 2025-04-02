import HyperExpress from 'hyper-express';
import { config } from '@server/config.mjs';
import sessionEngine from '@server/sessions.mjs';

const serve = new HyperExpress.Server();
serve.use(sessionEngine);

const { port = 3000 } = config;

import routes from './routes.mjs';
await routes.register(serve);

let sock;
try {
  sock = await serve.listen(port);
  console.log(`Listening on port ${port}.`);
} catch (e) {
  console.log(`Failed to start webserver on port ${port}`);
}

export const socket = sock;
export const server = serve;
