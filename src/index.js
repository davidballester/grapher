import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from 'firebase/app';

import { store } from './store';
import history from './services/history.service';
import { App } from './app.component';
import * as serviceWorker from './serviceWorker';
import './index.css';

firebase.initializeApp({
  apiKey: 'AIzaSyB7acR5DaXQ-4shrslNA7Q2_1wjnDPMZM4',
  authDomain: 'grapher-4e826.firebaseapp.com',
  databaseURL: 'https://grapher-4e826.firebaseio.com',
  projectId: 'grapher-4e826',
  storageBucket: 'grapher-4e826.appspot.com',
  messagingSenderId: '645009956208',
  appId: '1:645009956208:web:e063f283adf8b220c0c3b5',
  measurementId: 'G-YNY3VRTPYS',
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <CssBaseline />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
