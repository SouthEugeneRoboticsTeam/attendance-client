import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

import '../styles/TitleBar.css';

class LeaderboardRow extends Component {
    render() {
        if (this.props.total) {
            return (
                <TableRow className="TableRow" striped={!!(this.props.rank % 2)} key={this.props.rank}>
                    <TableRowColumn className="SignedInColumn">{this.props.name}</TableRowColumn>
                </TableRow>
            );
        } else {
            return null;
        }
    }
}

export default LeaderboardRow;
