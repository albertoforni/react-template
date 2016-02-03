import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import DevTools from '../containers//DevTools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);
const finalCreateStore = compose(
  applyMiddleware(thunk, reduxRouterMiddleware),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducers', () => {
      const nextRootReducer = require('../reducers/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
