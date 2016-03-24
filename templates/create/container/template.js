import React from 'react';
import { connect } from 'react-redux';
import styleable from 'react-styleable';
import { VelocityTransitionGroup } from 'velocity-react';

// ||| MyComponent -> componentName
import Actions from '../../actions/MyComponent';
const { fetch } = Actions;

// ||| MyComponent -> componentName
import css from './MyComponent.scss';

// ||| MyComponent -> componentName
class MyComponent extends React.Component {
  componentDidMount() {
    this.props.fetch();
  }

  render () {
    let { css } = this.props;

    return (
      <div className={css.root}>
        <VelocityTransitionGroup
          enter={{ animation: 'transition.fadeIn' }}
          leave='fadeOut'
          runOnMount={true}>
          <div></div>
        </VelocityTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: (...args) => {
      dispatch(fetch(...args));
    },
  };
};

// ||| MyComponent -> componentName
export default styleable(css)(connect(mapStateToProps, mapDispatchToProps)(MyComponent));
