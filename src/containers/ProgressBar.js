import React, {Component} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import '../styles/Login.css';


class ProgressBar extends Component {

    render() {
        return (
            <LinearProgress value={50}/>
        )
    }
}

export default ProgressBar