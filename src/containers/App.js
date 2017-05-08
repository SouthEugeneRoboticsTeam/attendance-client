import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { purple400 } from 'material-ui/styles/colors';

import MainPage from './MainPage';

import store from '../store';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: purple400,
    },
});

injectTapEventPlugin();

firebase.initializeApp({
    databaseURL: 'https://attendance-4b31e.firebaseio.com'
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={store}>
                    <MainPage />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
