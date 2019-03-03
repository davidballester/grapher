import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from '../../modules/store';

export class App extends Component {
  render() {
    return <Provider store={store} />;
  }
}
