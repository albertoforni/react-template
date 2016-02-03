/*eslint-env mocha */
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import App from './App';
const shallowRenderer = ReactTestUtils.createRenderer();

describe('App', () => {
  beforeEach(() => {
    shallowRenderer.render(<App />);
  });

  it('renders', () => {
    const component = shallowRenderer.getRenderOutput();
    expect(component).to.ok;
  });
});
