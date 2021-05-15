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
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <LogoutButton variant="small" />
            </div>
        )) || <LoginButton variant="small" />
    );
};

export default Profile;
