import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import configureStore from './store/configureStore';
const store = configureStore();

import Routes from './routes';

let DevTools;
if (IS_PROD) {
  DevTools = () => <span />;
} else {
  DevTools = require('./containers/DevTools').default;
}

import './styles/main.scss';

const Client = (
	<Provider store={store}>
		<div>
			<Router history={browserHistory}>
				{ Routes }
			</Router>
			<DevTools />
		</div>
	</Provider>
);

const reactRoot = document.getElementById('root');
render(Client, reactRoot);
