import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'

import reducers from '../reducers';

const config = {
    apiKey: 'AIzaSyDnO_-9YCmjwNPovOoC8cvhEEng-yqPNn8',
    authDomain: 'attendance-4b31e.firebaseapp.com',
    databaseURL: 'https://attendance-4b31e.firebaseio.com',
    projectId: 'attendance-4b31e',
    storageBucket: 'attendance-4b31e.appspot.com',
    messagingSenderId: '254932967706'
};

firebase.initializeApp(config);
console.log("FIREBASE STARTED")
const store = createStore(
    reducers,
    {},
    compose(
        reactReduxFirebase(firebase, { userProfile: 'users' }),
    )
)

export default store
// const createStoreWithFirebase = compose(
//     reactReduxFirebase(config, { userProfile: 'users' }),
// )(createStore);
// export default createStoreWithFirebase(reducers);
