import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './app.js';
import { base } from './api.js';
import './i18n.js';
import ErrorHandler from './main/util/error-handler.js';

export const domain =
    process.env.REACT_APP_MANAGEMENT_URL ||
    'tennisbuchs-integration.eu.auth0.com';
const clientId =
    process.env.REACT_APP_CLIENT_ID || '3zGKc7ZnJIfeq4gRQTYRyYcS9GhgqZN0';

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
                <Suspense fallback={'loading'}>
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
