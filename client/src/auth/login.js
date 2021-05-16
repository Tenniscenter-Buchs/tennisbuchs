import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../loader.js';

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
            Log In
        </Button>
    );
};

export default LoginButton;
