import { createStore, applyMiddleware, combineReducers } from 'redux';
// import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'

// Initial state
const initialState = {
  students: [],
  newStudent: [],
  newStudentNameEntry: "",
  newStudentEmailEntry: "",
  campuses: [],
  newCampus: [],
  newCampusEntry: ""
}

// Action types
const CREATE_NEW_STUDENT = "CREATE_NEW_STUDENT",
  GET_STUDENTS = "GET_STUDENTS",
  WRITE_STUDENT_NAME = "WRITE_STUDENT_NAME",
  WRITE_STUDENT_EMAIL = "WRITE_STUDENT_EMAIL",
  CREATE_NEW_CAMPUS = "CREATE_NEW_CAMPUS",
  GET_CAMPUSES = "GET_CAMPUSES",
  WRITE_CAMPUS_NAME = "WRITE_CAMPUS_NAME";
  

// Action creators
export function createStudent(newStudent){
  return { type: CREATE_NEW_STUDENT, newStudent }
}

export function getStudents(students){
  return { type: GET_STUDENTS, students }
}

export function writeStudentName(studentName){
  return { type: WRITE_STUDENT_NAME, newStudentNameEntry: studentName }
}

export function writeStudentEmail(studentEmail){
  return { type: WRITE_STUDENT_EMAIL, newStudentEmailEntry: studentEmail }
}

export function createCampus(newCampus){
  return { type: CREATE_NEW_CAMPUS, newCampus }
}

export function getCampuses(campuses){
  return { type: GET_CAMPUSES, campuses }
}

export function writeCampusName(campusName){
  return { type: WRITE_CAMPUS_NAME, newCampusEntry: campusName}
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

export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      });
  }
}

export function postStudent (newStudent) {
  return function thunk (dispatch) {
    return axios.post('/api/students', { name: newStudent.name, email: newStudent.email })
      .then(res => res.data)
      .then(newStudent => {
        dispatch(createtStudent(newStudent))
        // history.push(`/students/${newStudent.id}`)
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

// export function deleteStudent(studentId) {
//   return function thunk (dispatch){
//     return axios.delete(`/api/students/${studentId}`)
//       .then(res => res.data)
//       .then(student => {
//         console.log('deleted student', student)
//         const students = students.filter(student => {
//           return student.id !== studentId
//         })
//         dispatch(getStudents(students))
//       })
//   }
// }

// Reducers
const reducer = (state=initialState, action) => {
  switch(action.type){
    case GET_STUDENTS:
      return Object.assign({}, state, { students: action.students })
      
    case CREATE_NEW_STUDENT:
      return Object.assign({}, state, { student: state.newStudent.concat(action.newStudent) })
      
    case WRITE_STUDENT_NAME:
      return Object.assign({}, state, { newStudentNameEntry: action.newStudentNameEntry })
      
    case WRITE_STUDENT_EMAIL:
      return Object.assign({}, state, { newStudentEmailEntry: action.newStudentEmailEntry })
      
    case GET_CAMPUSES:
      return Object.assign({}, state, { campuses: action.campuses })
      
    case CREATE_NEW_CAMPUS:
      return Object.assign({}, state, { newCampus: state.newCampus.concat(action.newCampus) })
     
    case WRITE_CAMPUS_NAME:
      return Object.assign({}, state, { newCampusEntry: action.newCampusEntry })

    default:
      return state;
    }

}


const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));
export default store;





