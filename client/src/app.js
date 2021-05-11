import React, { Component } from 'react';
import Blog from './portfolio/Blog.js';

class App extends Component {
    componentDidMount() {
        const ele = document.getElementById('ipl-progress-indicator');
        if (ele) {
            ele.classList.add('available');
            setTimeout(() => {
                ele.outerHTML = '';
            }, 2000);
        }
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
