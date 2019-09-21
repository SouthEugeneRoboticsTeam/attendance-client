import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


class Leaderboard extends Component {
    constructor() {
        super();

        this.state = { name: '', mentor: false };
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress.bind(this));
    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && this.props.open) {
            this.handleSubmit.bind(this)();
        }
    }

    handleSubmit() {
        // Verify that the user has entered a name
        if (this.state.name !== '') {
            this.props.handleSubmit(this.props.studentId, this.state.name, this.state.mentor);
            this.setState({ name: '', mentor: false });
        }
    }

    render() {
        const actions = [
            <Button onClick={this.props.handleClose}>
                Cancel
            </Button>,
            <Button onClick={this.handleSubmit.bind(this)}>
                Okay
            </Button>
        ];

        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose}>
                <DialogTitle>
                    Create Account
                </DialogTitle>
                <TextField
                    style={{ maxWidth: '250px' }}
                    value={this.state.name}
                    ref="name"
                    onChange={ (e) => this.setState({ name: e.target.value }) }
                    hintText="Jane Doe"
                    label="Full Name" />
                <FormControlLabel
                    control={
                        <Switch style={{ maxWidth: '125px' }} checked={this.state.mentor} onChange={ (e, toggled) => this.setState({ mentor: toggled }) }/>
                    }
                    label="Mentor"
                />
                {actions}
            </Dialog>
        );
    }
}

export default Leaderboard;
