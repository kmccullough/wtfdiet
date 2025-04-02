import indexPage from './handlers/index.mjs';
import staticAssets from './handlers/static.mjs';

export default function(server) {
  server.get('*', (request, response) =>
    staticAssets(request, response) || indexPage(request, response)
  );
}
