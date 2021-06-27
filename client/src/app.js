import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Blog from './main/Blog.js';
import Loader from './main/loader.js';
import { withTranslation } from 'react-i18next';

const App = () => {
    useEffect(() => Loader.disengage());

    return (
        <div className="app">
            {(window.cordova && (
                <HashRouter>
                    <Blog />
                </HashRouter>
            )) || (
                <BrowserRouter>
                    <Blog />
                </BrowserRouter>
            )}
        </div>
    );
};

export default withTranslation()(App);
