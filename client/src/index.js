import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './app.js';
import './i18n';

var domain;
var clientId;
if (process.env.REACT_APP_ENV === 'production') {
    domain = 'auth.tennis-buchs.ch';
    clientId = 'Hm8Yqdipa8Dj0vHUvuvk58f1HQxP41y9';
} else if (process.env.REACT_APP_ENV === 'staging') {
    domain = 'tennisbuchs-staging.eu.auth0.com';
    clientId = 'VKhMeAhaiFk13cBtKa3vlXJzdiD00YrE';
} else {
    domain = 'tennisbuchs-integration.eu.auth0.com';
    clientId = '3zGKc7ZnJIfeq4gRQTYRyYcS9GhgqZN0';
}

export { domain };

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            audience={'https://' + domain + '/api/v2/'}
            scope="read:current_user update:current_user_metadata"
        >
            <Suspense fallback="loading">
                <App />
            </Suspense>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
