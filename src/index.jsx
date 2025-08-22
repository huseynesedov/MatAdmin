import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import ResizeObserver from "resize-observer-polyfill";
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/styles/index.scss';
import './assets/styles/orderdetail.scss';
import './assets/styles/Topbar.scss';
import './assets/styles/Home.scss';

// if (typeof window.ResizeObserver !== "undefined") {
//   window.ResizeObserver = ResizeObserver;
// }
// Hata yakalayıcıyı en üst seviyede tanımla
const resizeObserverLoopErr = () => {
  const resizeObserverLoopErr = window.onerror;
  window.onerror = function(msg, url, line, col, error) {
    if (msg.toLowerCase().includes('resizeobserver')) {
      return true; // ResizeObserver hatalarını gizle
    }
    return resizeObserverLoopErr && resizeObserverLoopErr(msg, url, line, col, error);
  };
};
// Bu kod ResizeObserver hatasını bastırır
const resizeObserverErrHandler = () => {};

// Global error event'inde yakalayıp bastırıyoruz
window.addEventListener("error", (e) => {
  if (
    e.message === "ResizeObserver loop completed with undelivered notifications." ||
    e.message === "ResizeObserver loop limit exceeded"
  ) {
    e.stopImmediatePropagation();
  }
});

// Ayrıca unhandledrejection (bazı tarayıcılarda çıkabiliyor) için de
window.addEventListener("unhandledrejection", (e) => {
  if (
    e.reason?.message === "ResizeObserver loop completed with undelivered notifications." ||
    e.reason?.message === "ResizeObserver loop limit exceeded"
  ) {
    e.preventDefault();
  }
});


resizeObserverErrHandler()
// Uygulama başlatılmadan önce çağır
resizeObserverLoopErr();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
