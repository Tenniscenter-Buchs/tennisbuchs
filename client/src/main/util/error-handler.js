import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Trans } from 'react-i18next';
import { ErrorContext } from '../../api.js';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ErrorHandler() {
    var [open, setOpen] = useState(false);
    var [returnCode, setReturnCode] = useState(200);
    var [errorMsg, setErrorMsg] = useState('');

    ErrorContext.callback = (o, rc, msg) => {
        setOpen(o);
        setReturnCode(rc);
        setErrorMsg(msg);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={returnCode === 200 ? 'success' : 'error'}
            >
                <React.Fragment>
                    {returnCode !== 200 ? (
                        <React.Fragment>
                            <Trans i18nKey="profile.error">Error</Trans>
                            {' - ' + errorMsg}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Trans i18nKey="profile.savedChanges">
                                Saved changes
                            </Trans>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </Alert>
        </Snackbar>
    );
}

export default ErrorHandler;
