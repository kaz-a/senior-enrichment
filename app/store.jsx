import { createStore, applyMiddleware, combineReducers } from 'redux';
// import rootReducer from './reducers/rootReducer';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'

// Initial state
const initialState = {
  students: [],
  newStudent: {},
  newStudentNameEntry: "",
  newStudentEmailEntry: "",
  newStudentCampusEntry: "",
  campuses: [],
  newCampus: {},
  newCampusEntry: "",
  campusId: 3,
  studentId: 0,
  studentToUpdate: {}
}

// Action types
const CREATE_NEW_STUDENT = "CREATE_NEW_STUDENT",
  GET_STUDENTS = "GET_STUDENTS",
  WRITE_STUDENT_NAME = "WRITE_STUDENT_NAME",
  WRITE_STUDENT_EMAIL = "WRITE_STUDENT_EMAIL",
  SELECT_STUDENT_CAMPUS = "SELECT_STUDENT_CAMPUS",
  DELETE_STUDENT = "DELETE_STUDENT",
  // UPDATE_STUDENT = "UPDATE_STUDENT",
  CREATE_NEW_CAMPUS = "CREATE_NEW_CAMPUS",
  GET_CAMPUSES = "GET_CAMPUSES",
  WRITE_CAMPUS_NAME = "WRITE_CAMPUS_NAME",
  DELETE_CAMPUS = "DELETE_CAMPUS";
  
  
// ACTION CREATORS
// Students actions
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

export function selectStudentCampus(studentCampus){
  return { type: SELECT_STUDENT_CAMPUS, newStudentCampusEntry: studentCampus }
}

export function deleteStudentById(studentId){
  return { type: DELETE_STUDENT, studentId }
}

// // for updating student
// export function updateSelectedStudent(studentId, studentToUpdate){
//   return { type: UPDATE_STUDENT, studentId, studentToUpdate } 
// }


// campus actions
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
  return { type: DELETE_CAMPUS, campusId }
}


// THUNK CREATORS
// Student thunks
export function fetchStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      });
  }
}

export function postStudent (newStudent) {
  return function thunk (dispatch) {
    return axios.post('/api/students', {
        name: newStudent.name,
        email: newStudent.email,
        campusId: newStudent.campusId
      })
      .then(res => res.data)
      .then(newStudent => {
        dispatch(createStudent(newStudent))
      });
  }
}

// // // Update student not working yet
// export function updateStudent(studentId, updateStudent){
//   return function thunk (dispatch){
//     return axios.put(`/api/students/${studentId}`)
//     .then(res => res.data)
//     .then(student => {
//         console.log('student to be updated:', student)
//         dispatch(updateSelectedStudent(studentId, student))
//     })   
//   }
// }

export function deleteStudent(studentId) {
  return function thunk (dispatch){
    return axios.delete(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => {
        dispatch(deleteStudentById(studentId))
      })
  }
}


// Campus thunks
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


// REDUCERS
const rootReducer = (state=initialState, action) => {
  switch(action.type){

    // Student reducers
    case GET_STUDENTS:
      return Object.assign({}, state, { students: action.students })
      
    case CREATE_NEW_STUDENT:
      return Object.assign({}, state, { students: state.students.concat(action.newStudent) })
      
    case WRITE_STUDENT_NAME:
      return Object.assign({}, state, { newStudentNameEntry: action.newStudentNameEntry })
      
    case WRITE_STUDENT_EMAIL:
      return Object.assign({}, state, { newStudentEmailEntry: action.newStudentEmailEntry })
      
    case SELECT_STUDENT_CAMPUS:
      return Object.assign({}, state, { newStudentCampusEntry: action.newStudentCampusEntry })

    // // for updating student
    // case UPDATE_STUDENT: 
    //   return Object.assign({}, state, { studentToUpdate: action.studentToUpdate })

    case DELETE_STUDENT:
      const students = state.students.filter(function(student){
        return student.id !== action.studentId;
      })
      return Object.assign({}, state, { students: students })

    // Campus reducers
    case GET_CAMPUSES:
      return Object.assign({}, state, { campuses: action.campuses })
      
    case CREATE_NEW_CAMPUS:
      return Object.assign({}, state, { campuses: state.campuses.concat(action.newCampus) })
     
    case WRITE_CAMPUS_NAME:
      return Object.assign({}, state, { newCampusEntry: action.newCampusEntry })

    case DELETE_CAMPUS: 
      const campuses = state.campuses.filter(function(campus){
        return campus.id !== action.campusId;
      })      
      return Object.assign({}, state, { campuses: campuses })

    default:
      return state;
    }

}


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()));
export default store;





