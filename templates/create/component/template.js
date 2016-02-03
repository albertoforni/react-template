import React from 'react';
import styleable from 'react-styleable';

// ||| MyComponent -> componentName
import css from './MyComponent.scss';

// ||| MyComponent -> componentName
class MyComponent extends React.Component {
  render() {
    let { css } = this.props;

    return (
      <div className={css.root}>

      </div>
    );
  }
}

// ||| MyComponent -> componentName
export default styleable(css)(MyComponent);
