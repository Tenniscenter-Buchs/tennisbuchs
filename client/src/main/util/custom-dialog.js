import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { Trans } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: { whiteSpace: 'unset', wordBreak: 'break-all' },
}));

export default function CustomDialog(props) {
    const handleClose = () => {
        props.closeSnackbar(props.k);
        props.setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (props.open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [props.open]);
    const copy = () => {
        navigator.clipboard.writeText(
            'Error:\n' + props.det + '\nResponse:\n' + props.res
        );
    };

    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                scroll="body"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <Trans i18nKey="errorDetails">Error Details</Trans>
                </DialogTitle>
                <DialogContent dividers={false} style={{ maxHeight: '40vh' }}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        classes={{ root: classes.root }}
                    >
                        {props.det}
                    </DialogContentText>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        classes={{ root: classes.root }}
                    >
                        {props.res}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={copy} startIcon={<FileCopyOutlinedIcon />}>
                        <Trans i18nKey="copyToClipboard">
                            Copy to clipboard
                        </Trans>
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        <Trans i18nKey="ok">Ok</Trans>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
