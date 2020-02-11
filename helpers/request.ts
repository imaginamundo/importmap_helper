export function requestJson(uri, options = {}) {
  return fetch(uri, options)
    .then(res => {
      if (res.ok) return res.json();
      throw res;
    });
};