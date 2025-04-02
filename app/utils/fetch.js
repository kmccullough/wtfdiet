const fetchApi = globalThis.fetch;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export function fetch(url, options = {}) {
  return fetchApi(url, {
    headers: { ...defaultHeaders },
    method: 'POST',
    body: options.json ? JSON.stringify(options.json) : options.body,
  });
}

export function post(url, options = {}) {
  return fetch(url, {
    method: 'POST',
    ...options,
  })
}
