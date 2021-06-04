import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Blog from './portfolio/Blog.js';
import Loader from './loader.js';

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

export default App;
