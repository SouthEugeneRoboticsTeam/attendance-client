import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'


const SignOutDialog = (props) => {
    const actions = [
        <Button colors="primary" variant="outlined" onClick={props.handleClose}>
            Okay
        </Button>
    ];

    // Close dialog after 2 seconds
    if (props.open) {
        setTimeout(props.handleClose, 2000);
    }

    return (
        <Dialog open={props.open} onRequestClose={props.handleClose}>
            <DialogTitle>
                Signed Out
            </DialogTitle>
            You have been successfully signed out!
            {actions}
        </Dialog>
    );
};

export default SignOutDialog;
