import React from 'react';
import ReactDOM from 'react-dom';
import './styles/general.scss';
import App from './app';
import { BoardProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
        <BoardProvider >
          <App />
        </BoardProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
