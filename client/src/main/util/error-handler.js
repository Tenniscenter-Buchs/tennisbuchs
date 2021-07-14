import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorContext } from '../../api.js';
import { SnackbarProvider, useSnackbar } from 'notistack';

function Snackbar(props) {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();

    ErrorContext.callback = (rc, msg) => {
        if (rc >= 200 && rc < 300) {
            enqueueSnackbar(t('savedChanges', 'Saved Changes'), {
                variant: 'success',
            });
        } else {
            enqueueSnackbar(t('error', 'Error') + ' - ' + msg, {
                variant: 'error',
            });
        }
    };

    return props.component;
}

function ErrorHandler(props) {
    return (
        <SnackbarProvider maxSnack={3}>
            <Snackbar {...props} />
        </SnackbarProvider>
    );
}

export default ErrorHandler;
