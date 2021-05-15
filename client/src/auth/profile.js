import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login.js';
import LogoutButton from './logout.js';

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        (isAuthenticated && (
            <>
                <p>{user.email}</p>
                <LogoutButton variant="small" />
            </>
        )) || <LoginButton variant="small" />
    );
};

export default Profile;
