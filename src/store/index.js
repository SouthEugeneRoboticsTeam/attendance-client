import { createStore, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';

import reducers from '../reducers';

const config = {
    apiKey: "AIzaSyDznDAz5tbIaTBvY-wYjRMbg3nCtrLxDYM",
    authDomain: "attendance-2fd4c.firebaseapp.com",
    databaseURL: "https://attendance-2fd4c.firebaseio.com",
    projectId: "attendance-2fd4c",
    storageBucket: "attendance-2fd4c.appspot.com",
    messagingSenderId: "786876917018",
    appId: "1:786876917018:web:99dfcdd2dace26caf378a3",
    measurementId: "G-Y6C17GSNJ6"
};

const createStoreWithFirebase = compose(
    reactReduxFirebase(config, { userProfile: 'users' }),
)(createStore);

export default createStoreWithFirebase(reducers);
