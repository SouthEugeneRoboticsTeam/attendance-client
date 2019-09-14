import React, { Component } from 'react';
import { isLoaded } from 'react-redux-firebase';
import Paper from '@material-ui/core/Paper';
import '../styles/Leaderboard.css';

import LeaderboardTable from '../components/LeaderboardTable';

class Leaderboard extends Component {
    constructor(props) {
        super(props);

        this.state = { heartbeat: (new Date()).getTime() };

        this.heartbeat = this.heartbeat.bind(this);
    }

    componentDidMount() {
        // Update the leaderboard every 15 seconds
        this.interval = setInterval(this.heartbeat, 15 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    heartbeat() {
        this.setState({ heartbeat: (new Date()).getTime() });
    }

    renderTable() {
        let { users, firebase } = this.props;
        const ref = firebase.ref;

        if (isLoaded(users)) {
            // Duplicate the object w/o the reference
            users = JSON.parse(JSON.stringify(users));

            // If Firebase gives us an array, convert it to an object
            if (users && users.constructor === Array) {
                users = users.reduce((acc, cur, i) => {
                    if (cur) acc[i] = cur;
                    return acc;
                }, {});
            }

            // Update the totals of signed in users
            for (const key in users) {
                if (!users.hasOwnProperty(key) || !users[key].signedIn) continue;

                const currentTime = (new Date()).getTime() - users[key].lastSignedIn;

                // Sign user out if they are signed in for too long
                // TODO: Move this somewhere else
                if (this.props.settings && currentTime > this.props.settings.autoSignOut) {
                    ref(`seasons/${this.props.season}/${key}/current`).once('value', snap => {
                        const currentKey = snap.val();

                        ref(`seasons/${this.props.season}/${key}/current`).set(null);
                        ref(`users/${key}/signedIn`).set(false);
                        ref(`users/${key}/lastSignedIn`).set(null);

                        ref(`seasons/${this.props.season}/${key}/${currentKey}`).once('value', snap => {
                            const { signIn } = snap.val();

                            ref(`seasons/${this.props.season}/${key}/${currentKey}/signOut`).set(signIn);
                        });
                    });
                }

                if (!users[key].total) users[key].total = {};

                if (users[key].total[this.props.season]) {
                    users[key].total[this.props.season] += currentTime;
                } else {
                    users[key].total[this.props.season] = currentTime;
                }
            }
        }

        return <LeaderboardTable season={this.props.season} users={users} />;
    }

    render() {
        return (
            <Paper className="Leaderboard" zDepth={1} rounded={false}>
                {this.renderTable.bind(this)()}
            </Paper>
        );
    }
}

export default Leaderboard;
