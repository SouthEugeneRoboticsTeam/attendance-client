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

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    // firestore: firestoreReducer // <- needed if using firestore
})

const store = createStore(
    rootReducer,
    {},
    compose(
        reactReduxFirebase(firebase, { userProfile: 'users' }), // pass in firebase instance instead of config
    )
)

// const createStoreWithFirebase = compose(
//     reactReduxFirebase(config, { userProfile: 'users' }),
// )(createStore);

export default store
// export default createStoreWithFirebase(reducers);
