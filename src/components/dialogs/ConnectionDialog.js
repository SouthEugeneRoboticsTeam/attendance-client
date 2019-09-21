import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const ConnectionDialog = (props) => {
    return (
        <Dialog open={props.open}>
            <DialogTitle>
                Lost Connection
            </DialogTitle>
            You must reconnect to the internet before continuing.
        </Dialog>

    );
};

export default ConnectionDialog;
