import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../main/loader.js';

const LogoutButton = (props) => {
    const { logout } = useAuth0();

    return (
        <Button
            {...props}
            onClick={() => {
                Loader.engage();
                logout({ returnTo: window.location.origin });
                Loader.disengage();
            }}
        >
            Log Out
        </Button>
    );
};

export default LogoutButton;
