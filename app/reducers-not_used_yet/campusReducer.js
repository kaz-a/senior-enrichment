import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'

// Initial state
const initialState = {
  campuses: [],
  newCampus: {},
  newCampusEntry: "",
  campusId: 0,
  studentId: 0
}

// Action types
const CREATE_NEW_CAMPUS = "CREATE_NEW_CAMPUS",
  GET_CAMPUSES = "GET_CAMPUSES",
  WRITE_CAMPUS_NAME = "WRITE_CAMPUS_NAME",
  DELETE_CAMPUS = "DELETE_CAMPUS";
  

// Action creators
export function createCampus(newCampus){
  return { type: CREATE_NEW_CAMPUS, newCampus }
}

export function getCampuses(campuses){
  return { type: GET_CAMPUSES, campuses }
}

export function writeCampusName(campusName){
  return { type: WRITE_CAMPUS_NAME, newCampusEntry: campusName}
}

export function deleteCampusById(campusId){
  return { type: DELETE_CAMPUS, campusId: campusId }
}


// Thunk creators
export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      });
  }
}

export function postCampus (newCampus){
  return function thunk (dispatch){
    return axios.post('/api/campuses', { name: newCampus })
      .then(res => res.data)
      .then(newCampus => {
        dispatch(createCampus(newCampus))
      })
  }
}

export function deleteCampus(campusId){
  return function thunk(dispatch){
    return axios.delete(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(deleteCampusById(campusId))
      })
  }
}


// Reducers
const campusReducer = (state=initialState, action) => {
  switch(action.type){
    case GET_CAMPUSES:
      return Object.assign({}, state, { campuses: action.campuses })
      
    case CREATE_NEW_CAMPUS:
      return Object.assign({}, state, { campuses: state.campuses.concat(action.newCampus) })
     
    case WRITE_CAMPUS_NAME:
      return Object.assign({}, state, { newCampusEntry: action.newCampusEntry })

    case DELETE_CAMPUS: // get the campuses WITHOUT the campus with campusId
      const campuses = state.campuses.filter(function(campus){
        return campus.id !== action.campusId;
      })      
      return Object.assign({}, state, { campuses: campuses })

    default:
      return state;
    }

}


export default campusReducer;




