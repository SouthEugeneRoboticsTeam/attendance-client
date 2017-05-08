import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

import formatTime from '../utils/formatTime';

import '../styles/TitleBar.css';

class LeaderboardRow extends Component {
    render() {
        return (
            <TableRow className="TableRow" striped={!!(this.props.rank % 2)} key={this.props.rank}>
                <TableRowColumn className="RankColumn">{this.props.rank}{this.props.signedIn && '*'}</TableRowColumn>
                <TableRowColumn className="NameColumn">{this.props.name}</TableRowColumn>
                <TableRowColumn className="TimeColumn">{formatTime(this.props.total)}</TableRowColumn>
            </TableRow>
        );
    }
}

export default LeaderboardRow;
