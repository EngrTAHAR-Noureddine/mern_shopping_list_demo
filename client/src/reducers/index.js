import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer
});

/* index.js is like a root of folder */