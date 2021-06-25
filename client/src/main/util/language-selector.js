import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                Language
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClose('de')}>German</MenuItem>
                <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
                <MenuItem onClick={() => handleClose('fr')}>French</MenuItem>
                <MenuItem onClick={() => handleClose('it')}>Italian</MenuItem>
            </Menu>
        </div>
    );
};

export default LanguageSelector;
