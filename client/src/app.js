import React, { Component } from 'react';
import axios from 'axios';
import { Header } from './header/header.js';
import { Body } from './body/body.js';
import { Footer } from './footer/footer.js';

export default class App extends Component {
    state = {
        response: {},
    };

    componentDidMount() {
        axios.get('/api/v1/say-something').then((res) => {
            const response = res.data;
            this.setState({ response });
        });
    }

    render() {
        return (
            <div className="app">
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}
