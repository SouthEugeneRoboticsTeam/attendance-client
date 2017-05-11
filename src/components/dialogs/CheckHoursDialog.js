import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import formatTime from '../../utils/formatTime';

const renderTimeStats = (totals) => {
    const seasons = [];
    let total = 0;

    for (const season in totals) {
        if (!totals.hasOwnProperty(season)) continue;

        seasons.push(
            <TableRow className="TableRow" striped={false} key={season}>
                <TableRowColumn className="SeasonColumn">{season}</TableRowColumn>
                <TableRowColumn className="TimeColumn">{formatTime(totals[season])}</TableRowColumn>
            </TableRow>
        );

        total += totals[season];
    }

    seasons.push(
        <TableRow className="TableRow" hovered={true} key="total">
            <TableRowColumn className="SeasonColumn"><b>TOTAL</b></TableRowColumn>
            <TableRowColumn className="TimeColumn">{formatTime(total)}</TableRowColumn>
        </TableRow>
    );

    return (
        <div>
            <Table className="CheckHoursTable" selectable={false} showCheckboxes={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn className="SeasonColumn">Season</TableHeaderColumn>
                        <TableHeaderColumn className="TimeColumn">Hours</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {seasons}
                </TableBody>
            </Table>
            <div style={{marginTop: '25px'}}>
                * Note that these are only your <i>official</i> hours, which update when you sign out.
            </div>
        </div>
    );
}

const CheckHoursDialog = (props) => {
    const actions = [
        <FlatButton
            label="Okay"
            primary={true}
            onClick={props.handleClose}
            autoFocus={true} />
    ];

    return (
        <Dialog
            title="Time Statistics"
            actions={actions}
            modal={false}
            open={props.open}
            onRequestClose={props.handleClose}>
            {renderTimeStats(props.totals)}
        </Dialog>
    );
};

export default CheckHoursDialog;
