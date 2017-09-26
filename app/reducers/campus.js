import axios from 'axios';


// // Initial state
// const initialState = {
//   campuses: []
//   // newCampus: ""
// }


// Action types
const GET_CAMPUSES_FROM_SERVER = "GET_CAMPUSES_FROM_SERVER",
  GET_NEW_CAMPUS = "GET_NEW_CAMPUS";


// Action creators
export function getCampuses(campuses){
  const action = { type: GET_CAMPUSES_FROM_SERVER, campuses };
  return action;
}

export function getNewCampus(newCampus){
  const action = { type: GET_NEW_CAMPUS, newCampus }
  return action;
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

export function postCampus (campus) {
  return function thunk (dispatch) {
    return axios.post('/api/campuses', { name: campus } )
      .then(res => res.data)
      .then(newCampus => {
        dispatch(getMessage(newCampus))
        history.push(`/campuses/${newCampus.id}`)
      });
  }
}

// Reducer
export default function campusReducer(state=[], action){
  switch(action.type){
    case GET_CAMPUSES_FROM_SERVER:
      return Object.assign({}, state, { campuses: action.campuses })

    case GET_NEW_CAMPUS:
      return Object.assign({}, state, { newCampus: action.newCampus })

    default:
      return state;
  }
}


