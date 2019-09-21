import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

import MainPage from './MainPage';

import store from '../store';

const theme = createMuiTheme({
    palette: {
        primary: purple
    }
});

// injectTapEventPlugin();

// firebase.initializeApp({
//     databaseURL: 'https://attendance-4b31e.firebaseio.com'
// });

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MainPage />
            </Provider>
        );
    }
}

export default App;
