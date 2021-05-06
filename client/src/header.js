import React, { Component } from 'react';
import { StickyContainer, Sticky  } from 'react-sticky';

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
            <StickyContainer>
                <Sticky>
                    {({ style  }) => <h1 style={style}>Sticky element</h1>}
                </Sticky>
            </StickyContainer>
        );
    }
}

export { Header };
