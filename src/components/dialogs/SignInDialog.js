import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'


const SignInDialog = (props) => {
    const actions = [
        <Button variant="outlined" color="primary" onClick={props.handleClose} autoFocus={true}>
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
                Signed In
            </DialogTitle>
            You have been successfully signed in!
            {actions}
        </Dialog>
    );
};

export default SignInDialog;
