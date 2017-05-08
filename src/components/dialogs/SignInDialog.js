import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const SignInDialog = (props) => {
    const actions = [
        <FlatButton
            label="Okay"
            primary={true}
            onClick={props.handleClose}
            autoFocus={true} />
    ];

    // Close dialog after 2 seconds
    if (props.open) {
        setTimeout(props.handleClose, 2000);
    }

    return (
        <Dialog
            title="Signed In"
            actions={actions}
            modal={false}
            open={props.open}
            onRequestClose={props.handleClose}>
            You have been successfully signed in!
        </Dialog>
    );
};

export default SignInDialog;
