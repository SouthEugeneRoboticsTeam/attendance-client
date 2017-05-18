import React from 'react';
import Dialog from 'material-ui/Dialog';

const ConnectionDialog = (props) => {
    return (
        <Dialog
            title="Lost Connection"
            modal={true}
            open={props.open}>
            You must reconnect to the internet before continuing.
        </Dialog>
    );
};

export default ConnectionDialog;
