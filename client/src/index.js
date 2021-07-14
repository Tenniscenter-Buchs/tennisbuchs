import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './app.js';
import { base } from './api.js';
import './i18n.js';
import Loader from './main/loader.js';
import ErrorHandler from './main/util/error-handler.js';

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

const startApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                redirectUri={window.location.origin}
                audience={base + '/'}
                scope="read:current_user update:current_user_metadata"
            >
                <Suspense fallback={Loader}>
                    <ErrorHandler component={<App />} />
                </Suspense>
            </Auth0Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
};

if (!window.cordova) {
    startApp();
} else {
    document.addEventListener('deviceready', startApp, false);
}
