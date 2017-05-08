import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class Leaderboard extends Component {
    constructor() {
        super();

        this.state = { name: '', mentor: false };
    }

    handleSubmit() {
        this.props.handleSubmit(this.props.studentId, this.state.name, this.state.mentor);
        this.setState({ name: '', mentor: false });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onClick={this.props.handleClose} />,
            <FlatButton
                label="Okay"
                primary={true}
                onClick={this.handleSubmit.bind(this)}
                autoFocus={true} />
        ];

        return (
            <Dialog
                title="Create Account"
                actions={actions}
                modal={true}
                open={this.props.open}
                onRequestClose={this.props.handleClose}>
                <TextField
                    style={{ maxWidth: '250px' }}
                    value={this.state.name}
                    onChange={ (e) => this.setState({ name: e.target.value }) }
                    hintText="Jane Doe"
                    floatingLabelText="Full Name" />
                <Toggle
                    style={{ maxWidth: '125px' }}
                    toggled={this.state.mentor}
                    onToggle={ (e, toggled) => this.setState({ mentor: toggled }) }
                    label="Mentor" />
            </Dialog>
        );
    }
}

export default Leaderboard;
