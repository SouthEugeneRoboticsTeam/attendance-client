import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../styles/Login.css';

import SignInDialog from '../components/dialogs/SignInDialog';
import SignOutDialog from '../components/dialogs/SignOutDialog';
import CheckHoursDialog from '../components/dialogs/CheckHoursDialog';
import CreateAccountDialog from '../components/dialogs/CreateAccountDialog';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentId: '',
            button: 0,

            userTimes: [],

            signInDialogOpen: false,
            signOutDialogOpen: false,
            checkHoursDialogOpen: false,
            createAccountDialogOpen: false
        };

        this.checkExists = this.checkExists.bind(this);
        this.checkSignedIn = this.checkSignedIn.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress.bind(this));
    }

    componentDidUpdate() {
        // Keep Student ID input focus
        if (!this.state.createAccountDialogOpen
            && !this.state.signInDialogOpen
            && !this.state.signOutDialogOpen) {
            this.refs.studentId.focus();
        }
    }

    checkExists(studentId = this.state.studentId) {
        console.log(studentId)
        if (!this.props.users) return false;

        let users = JSON.parse(JSON.stringify(this.props.users));

        // If Firebase gives us an array, convert it to an object
        if (users.constructor === Array) {
            users = users.reduce((acc, cur, i) => {
                if (cur) acc[i] = cur;
                return acc;
            }, {});
        }

        return Object.keys(users).indexOf(studentId) > -1;
    }

    checkSignedIn(studentId = this.state.studentId) {
        if (!this.props.users) return false;
        return this.props.users[studentId].signedIn;
    }

    signIn(studentId = this.state.studentId) {
        const ref = this.props.firebase.ref;
        const time = (new Date()).getTime();

        ref(`seasons/${this.props.season}/${studentId}`).push({ signIn: time }).then(snap => {
            ref(`seasons/${this.props.season}/${studentId}/current`).set(snap.key);
            ref(`users/${studentId}/signedIn`).set(true);
            ref(`users/${studentId}/lastSignedIn`).set(time)
        });

        this.setState({ studentId: '', button: 0, signInDialogOpen: true });
    }

    signOut(studentId = this.state.studentId) {
        const ref = this.props.firebase.ref;
        const time = (new Date()).getTime();

        ref(`seasons/${this.props.season}/${studentId}/current`).once('value', snap => {
            ref(`seasons/${this.props.season}/${studentId}/${snap.val()}/signOut`).set(time);
            ref(`seasons/${this.props.season}/${studentId}/current`).set(null);
            ref(`users/${studentId}/signedIn`).set(false);
            ref(`users/${studentId}/lastSignedIn`).set(null);

            ref(`seasons/${this.props.season}/${studentId}/${snap.val()}`).once('value', snap => {
                const { signIn, signOut } = snap.val();

                ref(`users/${studentId}/total/${this.props.season}`).once('value', snap => {
                    ref(`users/${studentId}/total/${this.props.season}`).set(snap.val() + (signOut - signIn));
                });
            });
        });

        this.setState({ studentId: '', button: 0, signOutDialogOpen: true });
    }

    checkHours(studentId = this.state.studentId) {
        const ref = this.props.firebase.ref;

        ref(`users/${studentId}/total`).once('value', (snap) => {
            console.log(snap.val());
            this.setState({ userTimes: snap.val(), checkHoursDialogOpen: true });
        });
    }

    createAccount(studentId, name, mentor) {
        const ref = this.props.firebase.ref;

        studentId = parseInt(studentId, 10);

        ref(`users/${studentId}/name`).set(name);
        ref(`users/${studentId}/mentor`).set(mentor);

        this.signIn(studentId);
        this.setState({ createAccountDialogOpen: false })
    }

    allowCreateAccount(studentId = this.state.studentId) {
        if (studentId
            && !isNaN(studentId)
            && parseInt(studentId, 10) >= 0
            && studentId.indexOf('.') === -1
            && studentId.indexOf('-') === -1) return true;
        else return false;
    }

    handleChange(e) {
        const studentId = e.target.value;
        this.setState({ studentId });

        if (this.checkExists(studentId)) {
            if (this.checkSignedIn(studentId)) {
                this.setState({ button: 2 });
            } else {
                this.setState({ button: 1 });
            }
        } else {
            this.setState({ button: 0 });
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter'
            && !this.state.createAccountDialogOpen
            && !this.state.signInDialogOpen
            && !this.state.signOutDialogOpen) {
            this.refs.button.props.onClick();
        }
    }

    render() {
        let button;
        switch(this.state.button) {
            case 1:
                button = (
                    <RaisedButton
                        ref="button"
                        label="Sign In"
                        onClick={ () => this.signIn() }
                        primary={true} />
                );
                break;
            case 2:
                button = (
                    <RaisedButton
                        ref="button"
                        label="Sign Out"
                        onClick={ () => this.signOut() }
                        primary={true} />
                )
                break;
            default:
                button = (
                    <RaisedButton
                        ref="button"
                        label="Create Account"
                        disabled={!this.allowCreateAccount()}
                        onClick={ () => this.setState({ button: 0, createAccountDialogOpen: true }) }
                        primary={true} />
                );
        }

        return (
            <div className="Login">
                <img className="Logo" alt="logo" src="/images/logo.png" height={150} />
                <Paper className="LoginBox" zDepth={1} rounded={false}>
                    <TextField
                        ref="studentId"
                        floatingLabelText="Student ID"
                        type="number"
                        autoFocus={true}
                        value={this.state.studentId}
                        onChange={this.handleChange} />
                    <br />
                    {button}
                    <RaisedButton
                        label="Check Hours"
                        disabled={!this.checkExists()}
                        onClick={ () => this.checkHours() }
                        secondary={true}
                        style={{ marginLeft: '20px' }}/>
                </Paper>

                <SignInDialog
                    open={this.state.signInDialogOpen}
                    handleClose={ () => { this.setState({ signInDialogOpen: false }) }} />
                <SignOutDialog
                    open={this.state.signOutDialogOpen}
                    handleClose={ () => { this.setState({ signOutDialogOpen: false }) }} />
                <CheckHoursDialog
                    open={this.state.checkHoursDialogOpen}
                    handleClose={ () => { this.setState({ checkHoursDialogOpen: false }) }}
                    totals={this.state.userTimes} />
                <CreateAccountDialog
                    open={this.state.createAccountDialogOpen}
                    handleSubmit={this.createAccount}
                    handleClose={ () => { this.setState({ createAccountDialogOpen: false }) }}
                    studentId={this.state.studentId} />
            </div>
        );
    }
}

export default Login;
