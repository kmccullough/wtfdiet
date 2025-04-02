import { config } from '@server/config.mjs';

export default function(request, response) {
  return response.sendFile(config.paths.index);
}
