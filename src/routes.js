import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/App';

function SimpleDiv() {
  return <p>hello world</p>;
};

export default (
  <Route path='/' component={App}>
    <IndexRoute component={SimpleDiv} />
  </Route>
);
