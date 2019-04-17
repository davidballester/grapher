import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { store } from './modules/store';
import history from './services/history';
import { App } from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
