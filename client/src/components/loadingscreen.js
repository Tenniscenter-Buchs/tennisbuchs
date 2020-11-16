import React, { Component } from 'react';

export default class LoadingScreen extends Component {
    render() {
        return (
            <div class="ipl-progress-indicator" id="ipl-progress-indicator">
                <div class="ipl-progress-indicator-head">
                    <div class="first-indicator"></div>
                    <div class="second-indicator"></div>
                </div>
                <div class="insp-logo-frame">
                    <img
                        class="insp-logo-frame-img"
                        src="res/logo/logo.svg"
                        alt="Tenniscenter Buchs Logo"
                        width="auto"
                        height="auto"
                        style={{ maxWidth: '30%', maxHeight: '15%' }}
                    />
                </div>
            </div>
        );
    }
}
