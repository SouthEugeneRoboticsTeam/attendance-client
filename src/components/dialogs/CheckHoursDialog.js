import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import formatTime from '../../utils/formatTime';

const renderTimeStats = (totals) => {
    const seasons = [];
    let total = 0;

    for (const season in totals) {
        if (!totals.hasOwnProperty(season)) continue;

        seasons.push(
            <TableRow className="TableRow" striped={false} key={season}>
                <TableCell className="SeasonColumn">{season}</TableCell>
                <TableCell className="TimeColumn">{formatTime(totals[season])}</TableCell>
            </TableRow>
        );

        total += totals[season];
    }

    seasons.push(
        <TableRow className="TableRow" hovered={true} key="total">
            <TableCell className="SeasonColumn"><b>TOTAL</b></TableCell>
            <TableCell className="TimeColumn">{formatTime(total)}</TableCell>
        </TableRow>
    );

    return (
        <div>
            <Table className="CheckHoursTable">
                <TableHead>
                    <TableRow>
                        <TableCell className="SeasonColumn">Season</TableCell>
                        <TableCell className="TimeColumn">Hours</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
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
        <Button onClick={props.handleClose}>
            Okay
        </Button>
    ];

    return (
        <Dialog actions={actions} open={props.open} onRequestClose={props.handleClose}>
            <DialogTitle>
                Time Statistics
            </DialogTitle>
            {renderTimeStats(props.totals)}
        </Dialog>
    );
};

export default CheckHoursDialog;
