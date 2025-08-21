import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import ResizeObserver from "resize-observer-polyfill";
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/styles/index.scss';
import './assets/styles/orderdetail.scss';
import './assets/styles/Topbar.scss';
import './assets/styles/Home.scss';

if (typeof window.ResizeObserver !== "undefined") {
  window.ResizeObserver = ResizeObserver;
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
