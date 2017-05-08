import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    firebaseConnect,
    dataToJS,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'

import '../styles/MainPage.css';

import TitleBar from '../components/TitleBar';
import Leaderboard from './Leaderboard';
import Login from './Login';

class MainPage extends Component {
    componentDidUpdate() {
        if (isLoaded(this.props.season) && isEmpty(this.props.season)) {
            const ref = this.props.firebase.ref;
            ref('seasons/current').set(`${(new Date()).getFullYear()}off`)
        }
    }

    render() {
        return (
            <div className="MainPage">
                <TitleBar />
                <Leaderboard
                    users={this.props.users}
                    season={this.props.season}
                    firebase={this.props.firebase} />
                <Login
                    users={this.props.users}
                    season={this.props.season}
                    firebase={this.props.firebase} />
            </div>
        );
    }
}

const wrappedMainPage = firebaseConnect([
    'users', 'seasons/current'
])(MainPage);

export default connect(({ firebase }) => ({
    users: dataToJS(firebase, 'users'),
    season: dataToJS(firebase, 'seasons/current')
}))(wrappedMainPage);
