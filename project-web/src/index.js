import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AuthStore } from './contexts/AuthStore';

import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <AuthStore>
      <App />
    </AuthStore>
  </BrowserRouter>,
  document.getElementById('root')
);
