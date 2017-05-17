import React, { Component } from 'react';
import { isLoaded } from 'react-redux-firebase';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import '../styles/Leaderboard.css';

import LeaderboardRow from './LeaderboardRow';

class LeaderboardTable extends Component {
    renderRows() {
        const { users } = this.props;

        if (users && isLoaded(users)) {
            const rows = [];

            // Sort the users from highest to lowest
            const sorted = Object.keys(users).sort((a, b) => {
                if (!users[a].total) users[a].total = {};
                if (!users[b].total) users[b].total = {};

                const aVal = users[a].total[this.props.season] || 0;
                const bVal = users[b].total[this.props.season] || 0;

                return bVal - aVal;
            });

            sorted.forEach((id, rank) => {
                rows.push(
                    <LeaderboardRow
                        key={id}
                        name={users[id].name}
                        signedIn={users[id].signedIn}
                        total={users[id].total && users[id].total[this.props.season]}
                        rank={rank + 1} />
                );
            });

            return rows;
        }

        return [];
    }

    render() {
        return (
            <Table className="LeaderboardTable" selectable={false} showCheckboxes={false} height={"calc(100vh - 64px - 80px)"}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn className="RankColumn">Rank</TableHeaderColumn>
                        <TableHeaderColumn className="NameColumn">Name</TableHeaderColumn>
                        <TableHeaderColumn className="TimeColumn">Hours</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.renderRows.bind(this)()}
                </TableBody>
            </Table>
        );
    }
};

export default LeaderboardTable;
