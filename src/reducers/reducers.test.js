/*eslint-env mocha */
import { expect } from 'chai';
import prequire from 'proxyquire';

const reducer = prequire('./reducers', {
  'react-router-redux': {
    routeReducer: () => {
      return {};
    },
  },
}).default;

describe('Reducers', () => {
  it('returns and object with the expect keys', () => {
    let defaultObject = reducer(undefined, {});

    expect(defaultObject.routing).to.exist;
  });
});
