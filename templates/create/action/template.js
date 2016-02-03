// ||| MyComponent -> componentName
import * as API from '../api/MyComponent';
// ||| MyComponent -> componentName
import MyComponentConstants from '../constants/MyComponent';

const {
  FETCHING,
  RECEIVED,
  ERROR,
// ||| MyComponent -> componentName
} = MyComponentConstants;

const Actions = {
  fetching() {
    return {
      type: FETCHING,
    };
  },

  receive(res) {
    return {
      type: RECEIVED,
      res,
    };
  },

  error(err) {
    return {
      type: ERROR,
      err,
    };
  },

  fetch() {
    return dispatch => {
      dispatch(Actions.fetching());

      return API.fetch()
      .then(res => dispatch(Actions.receive(res)))
      .catch(err => dispatch(Actions.error(err)));
    };
  },
};

export default Actions;
