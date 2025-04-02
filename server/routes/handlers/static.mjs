import LiveDirectory from 'live-directory';
import { config } from '@server/config.mjs';

const assets = new LiveDirectory(config.paths.public);

export default function(request, response) {
  const file = assets.get(request.path);
  if (!file) {
    return;
  }

  const fileParts = file.path.split('.');
  const extension = fileParts[fileParts.length - 1];

  // Retrieve the file content and serve it depending on the type of content available for this file
  const content = file.content;
  if (content instanceof Buffer) {
    // Set appropriate mime-type and serve file content Buffer as response body (This means that the file content was cached in memory)
    return response.type(extension).send(content);
  } else {
    // Set the type and stream the content as the response body (This means that the file content was NOT cached in memory)
    return response.type(extension).stream(
      content instanceof ReadableStream ? content : file.stream()
    );
  }
}
