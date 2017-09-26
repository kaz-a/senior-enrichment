

// Initial state
const initialState = {
  newStudent: ""
}


// Action types
const CREATE_NEW_STUDENT = "CREATE_NEW_STUDENT";

// Action creators
export function addNewStudent(newStudent){
  const action = { type: CREATE_NEW_STUDENT, newStudent }
  return action;
}

// Reducer
export default function newStudentReducer(state=initialState, action){
  switch(action.type){
    case CREATE_NEW_STUDENT:
      return Object.assign({}, state, { newStudent: action.newStudent })
    
    default:
      return state;
  }
}
