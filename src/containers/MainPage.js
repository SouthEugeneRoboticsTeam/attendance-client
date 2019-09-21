import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
    firebaseConnect,
    isLoaded,
    isEmpty,
    getVal
} from 'react-redux-firebase'

import '../styles/MainPage.css';
import firebase from 'firebase'
import '../store/index'
import TitleBar from '../components/TitleBar';
import Leaderboard from './Leaderboard';
import ProgressBar from './ProgressBar'
import Login from './Login';
import {createMuiTheme} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: purple
    }
});

class MainPage extends Component {
    componentDidUpdate() {
        if (isLoaded(this.props.season) && isEmpty(this.props.season)) {
            const ref = this.props.firebase.ref;
            ref('seasons/current').set(`${(new Date()).getFullYear()}off`)
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="MainPage">
                    <TitleBar />
                    <Leaderboard
                        users={this.props.users}
                        season={this.props.season}
                        firebase={this.props.firebase}
                        settings={this.props.settings} />
                    <ProgressBar />

                    <Login
                        users={this.props.users}
                        season={this.props.season}
                        firebase={this.props.firebase} />
                </div>
            </ThemeProvider>
        );
    }
}

const wrappedMainPage = firebaseConnect([
    'users', 'settings', 'seasons/current'
])(MainPage);

export default connect(({ firebase }) => ({
    users: getVal(firebase, 'users'),
    season: getVal(firebase, 'seasons/current'),
    settings: getVal(firebase, 'settings')
}))(wrappedMainPage);