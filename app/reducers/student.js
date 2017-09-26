import axios from 'axios';

// // Initial state
// const initialState = {
//   students: []
//   // newStudent: ""
// }

// Action types
const GET_STUDENTS_FROM_SERVER = "GET_STUDENTS_FROM_SERVER",
  GET_NEW_STUDENT = "GET_NEW_STUDENT";


// Action creators
export function getStudents(students){
  const action = { type: GET_STUDENTS_FROM_SERVER, students };
  return action;
}


export function getNewStudent(newStudent){
  const action = { type: GET_NEW_STUDENT, newStudent }
  return action;
}



// Thunk creators
export function fetchStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      });
  }
}

export function postStudent (student) {
  return function thunk (dispatch) {
    return axios.post('/api/students', { name: student} )
      .then(res => res.data)
      .then(newStudent => {
        dispatch(getStudent(newStudent))
        history.push(`/students/${newStudent.id}`)
      });
  }

}


// Reducer
export default function studentReducer(state=[], action){
  switch(action.type){
    case GET_STUDENTS_FROM_SERVER:
      return Object.assign({}, state, { students: action.students })
      
    case GET_NEW_STUDENT:
      return Object.assign({}, state, { newStudent: action.newStudent })

    default:
      return state;
  }
}



