import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Blog from './portfolio/Blog.js';
import Loader from './loader.js';

const App = () => {
    useEffect(() => Loader.disengage());

    return (
        <div className="app">
            <Router>
                <Blog />
            </Router>
        </div>
    );
};

export default App;
