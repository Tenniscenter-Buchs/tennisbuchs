import React, { Component } from 'react';
import SignIn from './signin.js';
import StickyFooter from './footer.js';

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
                <SignIn />
                <StickyFooter />
            </div>
        );
    }
}

export { App };
