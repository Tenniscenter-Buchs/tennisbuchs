import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import LoginButton from './login.js';
import LogoutButton from './logout.js';
import SignUp from './signup.js';
import { domain } from '../index.js';

const Profile = () => {
    const {
        user,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently,
    } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: 'read:current_user',
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                console.log('Metadata: ' + JSON.stringify(user_metadata));
                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        (isAuthenticated && (
            <>
                <p>{user.email}</p>
                <Button component={Link} to="/profile" variant="small">
                    <Trans i18nKey="profile.editProfile">Edit Profile</Trans>
                </Button>
                <LogoutButton variant="small" />
                {!userMetadata ||
                    (Object.keys(userMetadata).length === 0 && (
                        <Redirect to="/profile" />
                    ))}
            </>
        )) || <LoginButton variant="small" />
    );
};

export default Profile;
