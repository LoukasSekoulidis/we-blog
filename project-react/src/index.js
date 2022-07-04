import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './redux/store'
import { Provider } from 'react-redux'

import config from 'react-global-configuration';
import configFile from './config/config'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

config.set(configFile)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
