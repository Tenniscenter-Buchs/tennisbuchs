import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = (props) => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button props={props} onClick={() => loginWithRedirect()}>
            Log In
        </Button>
    );
};

export default LoginButton;
