import React from 'react';
import styleable from 'react-styleable';

import css from './App.scss';

// App Entry Point
class App extends React.Component {
  render () {
    let { css, children } = this.props;

    return (
      <div className={css.root} >
        {children}
      </div>
    );
  }
}

export default styleable(css)(App);
