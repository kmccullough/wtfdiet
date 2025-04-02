// Suppress experimental JSON import warnings
import './import-json.mjs';
// Register custom resolver for imports based on `jsconfig.json`
import { register } from 'node:module';
register('./resolver.mjs', import.meta.url);
// Start server/controller
await import('@server/ipc.mjs');
const { server } = await import('@server/server.mjs');

process.on('SIGINT', async () => {
  console.log('Caught interrupt signal');
  await Promise.all([
    server.shutdown(),
  ]);
  console.log('Server closed successfully.');
  process.exit(0);
});
