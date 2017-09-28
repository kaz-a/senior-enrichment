import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

import studentReducer from './studentReducer';
import campusReducer from './campusReducer';

const rootReducer = combineReducers({
  studentReducer,
  campusReducer
})


export default rootReducer;

