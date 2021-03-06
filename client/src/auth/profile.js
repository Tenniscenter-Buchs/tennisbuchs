import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import LoginButton from './login.js';
import { domain } from '../index.js';
import LanguageSelector from '../main/util/language-selector.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Loader from '../main/loader.js';

const ProfileHeader = (props) => {
    const userMetadata = props.userMetadata;
    if (userMetadata) {
        return (
            <React.Fragment>
                <Trans i18nKey="loggedInAs">Logged in as</Trans>
                {' ' + userMetadata.firstName + ' ' + userMetadata.lastName}
            </React.Fragment>
        );
    } else {
        return null;
    }
};

const Profile = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } =
        useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            try {
                const aToken = await getAccessTokenSilently();
                localStorage.setItem('accessToken', aToken);

                const mToken = await getAccessTokenSilently({
                    audience:
                        'https://' +
                        (process.env.REACT_APP_MANAGEMENT_URL ||
                            'tennisbuchs-integration.eu.auth0.com') +
                        '/api/v2/',
                    scope: 'read:current_user update:current_user_metadata',
                });
                localStorage.setItem('managementToken', mToken);

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${mToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();
                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user]);

    if (isLoading) {
        return (
            <div>
                <Trans i18nKey="profile.loading">Loading...</Trans>
            </div>
        );
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            {(isAuthenticated && (
                <React.Fragment>
                    <div>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <Trans i18nKey="profile.profileString">
                                Profile
                            </Trans>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                component={ProfileHeader}
                                userMetadata={userMetadata}
                            />
                            <MenuItem
                                component={Link}
                                onClick={handleClose}
                                to="/profile"
                                variant="small"
                            >
                                <Trans i18nKey="profile.editProfile">
                                    Edit Profile
                                </Trans>
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                onClick={handleClose}
                                to="/password"
                                variant="small"
                            >
                                <Trans i18nKey="profile.changePassword">
                                    Change password
                                </Trans>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    Loader.engage();
                                    localStorage.removeItem('accessToken');
                                    localStorage.removeItem('managementToken');
                                    logout({
                                        returnTo: window.location.origin,
                                    });
                                    Loader.disengage();
                                    handleClose();
                                }}
                            >
                                <Trans i18nKey="profile.logout">Log Out</Trans>
                            </MenuItem>
                        </Menu>
                    </div>
                </React.Fragment>
            )) || <LoginButton variant="small" />}
            <LanguageSelector />
        </React.Fragment>
    );
};

export default Profile;
