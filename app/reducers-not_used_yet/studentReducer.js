import { createStore, applyMiddleware, combineReducers } from 'redux';
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
  studentId: 0
}

// Action types
const CREATE_NEW_STUDENT = "CREATE_NEW_STUDENT",
  GET_STUDENTS = "GET_STUDENTS",
  WRITE_STUDENT_NAME = "WRITE_STUDENT_NAME",
  WRITE_STUDENT_EMAIL = "WRITE_STUDENT_EMAIL",
  SELECT_STUDENT_CAMPUS = "SELECT_STUDENT_CAMPUS",
  DELETE_STUDENT = "DELETE_STUDENT";
  

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

export function selectStudentCampus(studentCampus){
  return { type: SELECT_STUDENT_CAMPUS, newStudentCampusEntry: studentCampus }
}

export function deleteStudentById(studentId){
  return { type: DELETE_STUDENT, studentId: studentId }
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


export function deleteStudent(studentId) {
  return function thunk (dispatch){
    return axios.delete(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => {
        dispatch(deleteStudentById(studentId))
      })
  }
}



// Reducers
const studentReducer = (state=initialState, action) => {
  switch(action.type){
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

    case DELETE_STUDENT:
      const students = state.students.filter(function(student){
        return student.id !== action.studentId;
      })
      return Object.assign({}, state, { students: students })

    default:
      return state;
    }

}


export default studentReducer;





