import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Trans } from 'react-i18next';
import Blog from './portfolio/Blog.js';
import Loader from './loader.js';

class App extends Component {
    componentDidMount() {
        Loader.disengage();
    }

    render() {
        return (
            <div className="app">
                <Router>
                    <Switch>
                        <Route path="/profile">
                            <Trans i18nKey="profile.editProfile">
                                <p>Edit profile</p>
                            </Trans>
                        </Route>
                        <Route path="/">
                            <Blog />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
