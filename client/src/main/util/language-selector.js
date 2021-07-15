import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Trans, useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const { i18n } = useTranslation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (language) => {
        setAnchorEl(null);
        i18n.changeLanguage(language);
    };

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Trans i18nKey="profile.language">Language</Trans>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleClose('de')}>Deutsch</MenuItem>
                <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
                <MenuItem onClick={() => handleClose('fr')}>Français</MenuItem>
                <MenuItem onClick={() => handleClose('it')}>Italiano</MenuItem>
            </Menu>
        </div>
    );
};

export default LanguageSelector;
