import React, { Component } from 'react';
import axios from 'axios';
import { Header } from './components/header.js';
import { Body } from './components/body.js';
import { Footer } from './components/footer.js';
import LoadingScreen from './components/loadingscreen.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isReady: false };
        this.setReady = this.setReady.bind(this);
    }

    setReady(ready) {
        this.setState({ isReady: ready });
    }

    render() {
        return (
            <>
                {!this.state.isReady && <LoadingScreen />}
                <AppWrapper setReady={this.setReady} />
            </>
        );
    }
}

class AppWrapper extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.setReady(true);
        }, 2000);
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

export { App };
