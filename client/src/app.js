import React, { Component } from 'react';
import Blog from './portfolio/Blog.js';
import Loader from './loader.js';

class App extends Component {
    componentDidMount() {
        Loader.disengage();
    }

    render() {
        return (
            <div className="app">
                <Blog />
            </div>
        );
    }
}

export { App };
