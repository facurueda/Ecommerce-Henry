import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./redux/store";
import { CookiesProvider } from 'react-cookie';
import { Auth0Provider } from "@auth0/auth0-react"; 

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId =  process.env.REACT_APP_AUTH0_CLIENT_ID


ReactDOM.render(
    <Provider store = {store}>
      <CookiesProvider>
      <Auth0Provider
        domain = {domain}
        clientId = {clientId}
        redirectUri = {window.location.origin}
      >
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </Auth0Provider>
      </CookiesProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
