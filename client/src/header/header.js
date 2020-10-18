import React, { Component } from 'react';
import Twirl from 'hamburger-react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: null,
            setOpen: null
        }
    }

    render() {
        return (
            <Twirl toggled={this.state.isOpen} toggle={this.state.setOpen} />
        );
    }
}

export { Header };
