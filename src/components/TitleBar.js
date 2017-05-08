import React from 'react';
import AppBar from 'material-ui/AppBar';

import '../styles/TitleBar.css';

const TitleBar = () => (
    <AppBar
        className="TitleBar"
        title="SERT Attendance"
        iconElementLeft={<div />} />
);

export default TitleBar;
