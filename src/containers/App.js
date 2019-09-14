import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import MainPage from './MainPage';

import store from '../store';

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500]
        },
    },
});

// injectTapEventPlugin();

// firebase.initializeApp({
//     databaseURL: 'https://attendance-4b31e.firebaseio.com'
// });

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={muiTheme}>
                <Provider store={store}>
                    <MainPage />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
