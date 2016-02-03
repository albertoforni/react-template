import React, { Component, PropTypes } from 'react';
import styleable from 'react-styleable';
import { VelocityTransitionGroup } from 'velocity-react';

import css from './Loading.scss';

class Loading extends Component {
  render() {
    let { css, loading } = this.props;

    if (!loading) return <div className={css.root} />;

    return (
      <VelocityTransitionGroup
        className={ css.animationContainer }
        enter={{ animation: 'transition.fadeIn' }}
        leave='fadeOut'>
        <div className={css.root}>
          <div className={css.rect1}></div>
          <div className={css.rect2}></div>
          <div className={css.rect3}></div>
          <div className={css.rect4}></div>
          <div className={css.rect5}></div>
        </div>
      </VelocityTransitionGroup>

    );
  }
}

Loading.propTypes = {
  css: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default styleable(css)(Loading);
