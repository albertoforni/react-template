import * as API from './base.js';

export function fetchAssignments() {
  return API.fetch('/')
  .then(res => {
    return res;
  });
};
