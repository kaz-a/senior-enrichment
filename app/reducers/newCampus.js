

// Initial state
const initialState = {
  newCampus: ""
}


// Action types
const CREATE_NEW_CAMPUS = "CREATE_NEW_CAMPUS";

// Action creators
export function addNewCampus(newCampus){
  const action = { type: CREATE_NEW_CAMPUS, newCampus }
  return action;
}

// Reducer
export default function newCampusReducer(state=initialState, action){
  switch(action.type){
    case CREATE_NEW_CAMPUS:
      return Object.assign({}, state, { newCampus: action.newCampus })
    
    default:
      return state;
  }
}



