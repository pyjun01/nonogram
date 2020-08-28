import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: sans-serif; }
  html, body, #root, .App { width: 100%; height: 100%; background: #f9f9f9; }

  .App {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  canvas {
    outline: 1px solid #aaa;
    background: #fff;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
