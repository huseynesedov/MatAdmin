// src/index.tsx və ya index.js
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/reset.css";

import { StyleProvider } from '@ant-design/cssinjs';

import './assets/styles/index.scss';
import './assets/styles/orderdetail.scss';
import './assets/styles/Topbar.scss';
import './assets/styles/Home.scss';




ReactDOM.render(
    <React.StrictMode>
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
