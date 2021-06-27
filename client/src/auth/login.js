import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../main/loader.js';
import { Trans } from 'react-i18next';

const LoginButton = (props) => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            {...props}
            onClick={() => {
                Loader.engage();
                loginWithRedirect();
                Loader.disengage();
            }}
        >
            <Trans i18nKey="profile.login">Log In</Trans>
        </Button>
    );
};

export default LoginButton;
