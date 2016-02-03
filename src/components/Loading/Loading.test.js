/*eslint-env mocha */
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Loading from './Loading';
const shallowRenderer = ReactTestUtils.createRenderer();

describe('Loading', () => {
  beforeEach(() => {
    shallowRenderer.render(<Loading />);
  });

  it('renders', () => {
    const component = shallowRenderer.getRenderOutput();
    expect(component).to.ok;
  });
});
