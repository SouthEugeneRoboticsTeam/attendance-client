import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import formatTime from '../utils/formatTime';

import '../styles/TitleBar.css';

class LeaderboardRow extends Component {
    render() {
        if (this.props.total) {
            return (
                <TableRow className="TableRow" striped={!!(this.props.rank % 2)} key={this.props.rank}>
                    <TableCell className="RankColumn">{this.props.rank}{this.props.signedIn && '*'}</TableCell>
                    <TableCell className="NameColumn">{this.props.name}</TableCell>
                    <TableCell className="TimeColumn">{formatTime(this.props.total)}</TableCell>
                </TableRow>
            );
        } else {
            return null;
        }
    }
}

export default LeaderboardRow;
