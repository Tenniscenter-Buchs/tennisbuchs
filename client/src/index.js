import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app.js';

const loader = document.querySelector('.loader');
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

setTimeout(() => ReactDOM.render(
    <React.StrictMode>
        <App
            showLoader={showLoader}
            hideLoader={hideLoader}
        />
    </React.StrictMode>,
    document.getElementById('app')
), 3000);
