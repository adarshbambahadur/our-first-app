import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));


registerServiceWorker();
