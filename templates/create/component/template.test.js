/*eslint-env mocha */
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

// ||| MyComponent -> componentName
import MyComponent from './MyComponent';
const shallowRenderer = ReactTestUtils.createRenderer();

// ||| MyComponent -> componentName
describe('MyComponent', () => {
  beforeEach(() => {
    // ||| MyComponent -> componentName
    shallowRenderer.render(<MyComponent />);
  });

  it('renders', () => {
    const component = shallowRenderer.getRenderOutput();
    expect(component).to.ok;
  });
});
