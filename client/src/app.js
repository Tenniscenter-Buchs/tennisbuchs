import React, { Component } from 'react';
import axios from 'axios';
import { Header } from './header/header.js';
import { Body } from './body/body.js';
import { Footer } from './footer/footer.js';

class App extends React.Component {

    // fake authentication Promise
    authenticate() {
        return new Promise(resolve => setTimeout(resolve, 10000))
    }

    componentDidMount() {
        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator')
            if (ele) {
                ele.classList.add('available')
                setTimeout(() => {
                    ele.outerHTML = ''
                }, 2000)
            }
        })
    }

    render() {
        return (
             <div className="app">
             </div>
         );
    }
};

export { App };
