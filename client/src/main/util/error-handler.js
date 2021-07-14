import React, { useState, useEffect } from 'react';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { ErrorContext } from '../../api.js';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { OnlineStatusProvider, useOnlineStatus } from './use-online-status.js';
import CustomDialog from './custom-dialog.js';

function ErrorDetails(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <React.Fragment>
            <Button
                onClick={() => {
                    props.closeSnackbar(props.k);
                    setOpen(false);
                }}
            >
                <Trans i18nKey="dismiss">Dismiss</Trans>
            </Button>
            <Button onClick={handleOpen}>
                <Trans i18nKey="details">Details</Trans>
            </Button>
            <CustomDialog
                det={props.det}
                open={open}
                setOpen={setOpen}
                k={props.k}
                closeSnackbar={props.closeSnackbar}
            />
        </React.Fragment>
    );
}

function Snackbar(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const isOnline = useOnlineStatus();

    const [firstLoad, setFirstLoad] = useState(true);
    const [detMap, setDetMap] = useState(new Map());
    const [snackCount, setSnackCount] = useState(0);

    const action = (key) => (
        <React.Fragment>
            <Button
                onClick={() => {
                    closeSnackbar(key);
                }}
            >
                <Trans i18nKey="dismiss">Dismiss</Trans>
            </Button>
        </React.Fragment>
    );
    const errorAction = (k) => (
        <ErrorDetails k={k} det={detMap.get(k)} closeSnackbar={closeSnackbar} />
    );

    ErrorContext.callback = (rc, msg, det) => {
        if (rc >= 200 && rc < 300) {
            enqueueSnackbar(t('success', 'Success'), {
                variant: 'success',
                action,
            });
        } else {
            setDetMap(new Map(detMap.set(snackCount.toString(), det)));
            enqueueSnackbar(t('error', 'Error') + ' - ' + msg, {
                variant: 'error',
                action: errorAction,
                key: snackCount.toString(),
            });
            setSnackCount(snackCount + 1);
        }
    };

    useEffect(() => {
        if (!firstLoad && isOnline) {
            closeSnackbar();
            enqueueSnackbar(t('backOnline', 'You are back online'), {
                variant: 'success',
                action,
            });
        } else if (!firstLoad) {
            enqueueSnackbar(
                t('notOnline', 'No network connection, you are offline'),
                { variant: 'warning', persist: true, action }
            );
        } else {
            setFirstLoad(false);
        }
    }, [isOnline]);

    return props.component;
}

function ErrorHandler(props) {
    return (
        <SnackbarProvider maxSnack={3}>
            <OnlineStatusProvider>
                <Snackbar {...props} />
            </OnlineStatusProvider>
        </SnackbarProvider>
    );
}

export default withTranslation()(ErrorHandler);
