import fetchIso from 'isomorphic-fetch';

export function fetch(url) {
  return fetchIso(`${API_PREFIX}/${url}`, {
    credentials: 'same-origin',
  })
  .then(res => res.json());
};
