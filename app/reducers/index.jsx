import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import studentReducer from './student';
import campusReducer from './campus';
import newStudentReducer from './newStudent';
import newCampusReducer from './newCampus';


const initialState = {
  campuses: [],
  students: [],
  newCampus: '',
  newStudent: ''
};

// const rootReducer = function(state = initialState, action) {
//   switch(action.type) {
//     default: return state
//   }
// };

const reducer = combineReducers({
  students: studentReducer,
  campuses: campusReducer,
  newStudent: newStudentReducer,
  newCampus: newCampusReducer
})


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);


export default store;

// export action creators
export * from './student';
export * from './campus';
export * from './newStudent';
export * from './newCampus';





