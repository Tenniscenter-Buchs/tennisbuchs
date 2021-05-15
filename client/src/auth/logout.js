import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = (props) => {
    const { logout } = useAuth0();

    return (
        <Button
            props={props}
            onClick={() => logout({ returnTo: window.location.origin })}
        >
            Log Out
        </Button>
    );
};

export default LogoutButton;
