import React, { Component } from 'react';
import axios from 'axios';
import { Header } from './header/header.js';
import { Body } from './body/body.js';
import { Footer } from './footer/footer.js';

const { useEffect } = React;

const App = ({ hideLoader }) => {
    useEffect(hideLoader, []);
    return (
        <div className="app">
            <Header />
            <Body />
            <Footer />
        </div>
    );
};

export { App };
