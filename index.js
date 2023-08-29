import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './state/App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Buffer } from "buffer";
global.Buffer = Buffer;

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

