import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';

import '../styles/TitleBar.css';

const TitleBar = () => (

    <AppBar position={"static"}>
        <Toolbar className="TitleBar">
            <Typography variant="h6">
                SERT Attendance
            </Typography>
        </Toolbar>
    </AppBar>
);

export default TitleBar;
