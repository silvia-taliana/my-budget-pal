import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

// rendering app with authorization
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri="https://blooming-island-79334.herokuapp.com/login"
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    scope="all">
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);