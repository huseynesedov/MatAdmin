// src/index.tsx və ya index.js
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

import ResizeObserver from 'resize-observer-polyfill';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';

import './assets/styles/index.scss';
import './assets/styles/orderdetail.scss';
import './assets/styles/Topbar.scss';
import './assets/styles/Home.scss';


import { StyleProvider } from '@ant-design/cssinjs';
import { HashRouter } from 'react-router-dom';

// if (typeof window.ResizeObserver !== "undefined") {
//   window.ResizeObserver = ResizeObserver;
// }
//
const resizeObserverLoopErr = () => {
  const resizeObserverLoopErr = window.onerror;
  window.onerror = function (msg, url, line, col, error) {
    if (typeof msg === 'string' && msg.toLowerCase().includes('resizeobserver')) {
      return true; // ResizeObserver hatalarını gizle
    }
    return resizeObserverLoopErr && resizeObserverLoopErr(msg, url, line, col, error);
  };
};
// Bu kod ResizeObserver hatasını bastırır
const resizeObserverErrHandler = () => {};

// Global error event'inde yakalayıp bastırıyoruz
window.addEventListener('error', (e) => {
  if (
      e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
      e.message === 'ResizeObserver loop limit exceeded'
  ) {
    e.stopImmediatePropagation();
  }
});

// Ayrıca unhandledrejection (bazı tarayıcılarda çıkabiliyor) için de
window.addEventListener('unhandledrejection', (e) => {
  if (
      e.reason?.message === 'ResizeObserver loop completed with undelivered notifications.' ||
      e.reason?.message === 'ResizeObserver loop limit exceeded'
  ) {
    e.preventDefault();
  }
});

resizeObserverErrHandler();
// Uygulama başlatılmadan önce çağır
resizeObserverLoopErr();

ReactDOM.render(
    <React.StrictMode>
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
