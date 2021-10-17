/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { rest, setupWorker } from 'msw';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserResponse } from './types/user';

const response: UserResponse = {
  resultCode: 'OK',
  id: '123',
  name: 'Tarou',
  age: 12,
};
const handler = [
  rest.post('http://localhost:3000/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(response),
    );
  })];
const mockServer = setupWorker(...handler);
mockServer.start();

console.log('start server');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
