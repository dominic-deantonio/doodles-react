import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import AuthGate from './components/authGate';

ReactDOM.render(
  <Auth0Provider
    domain="dev-8ab2je54.us.auth0.com"
    clientId="hONfpoaUPffQ3tOIVxzSE4vjuGjQccV9"
    redirectUri={window.location.origin}
  >
    <AuthGate/>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
