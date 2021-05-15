import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { App } from './app.js';

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain="auth.tennis-buchs.ch"
            clientId="Hm8Yqdipa8Dj0vHUvuvk58f1HQxP41y9"
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
