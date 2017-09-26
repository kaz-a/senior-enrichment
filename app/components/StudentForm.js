import React, { Component } from 'react';
import store, { postStudent, writeStudentName, writeStudentEmail } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

const StudentForm = (props) => {
  console.log("props:", props)
  const { students, campuses, student, newStudentNameEntry, newStudentEmailEntry } = props;
  // const invalidInput = !props.newStudent.length; // fix this
  const campusExist = campuses.campuses && campuses.campuses.length;
  const inputStyle ={ marginBottom: "10px" }

  return(
    <div className="well">
      <h3> Add new student </h3>
      <form onSubmit={ (event) => props.handleSubmit(newStudentNameEntry, newStudentEmailEntry, event) }>
        <div className="form-group">
          <input name="name" type="text" 
            className="form-control" style={ inputStyle }
            placeholder="Enter a name"
            onChange={ props.handleNameChange } 
            value={ student.name } />
          <input name="email" type="text" 
            className="form-control" style={ inputStyle }   
            placeholder="Enter an email"
            onChange={ props.handleEmailChange } 
            value={ student.email } />
          <select>
            <option>Select Campus</option>
            {
              campusExist && campuses.campuses.map(campus => {
                return (
                  <option key={ campus.id }>{ campus.name }</option>
                )         
              })
            }

          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  )
}


const mapStateToProps = (state) => {
  return{
    student: state.student,
    campuses: state.campuses,
    students: state.students,
    newStudentNameEntry: state.newStudentNameEntry,
    newStudentEmailEntry: state.newStudentEmailEntry
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleNameChange: (event) => {
      console.log(event.target.value)
      dispatch(writeStudentName(event.target.value))
    },
    handleEmailChange: (event) => {
      dispatch(writeStudentEmail(event.target.value))
    },
    handleSubmit: (name, email, event) => {
      event.preventDefault();     
      dispatch(postStudent(event.target.value))
    }
  }
}

const studentFormContainer = withRouter(connect(mapStateToProps)(StudentForm))
export default studentFormContainer;









// const StudentForm = (props) => {
//   console.log("props:", props)
//   const { campuses, newStudent } = props;
//   const invalidInput = !props.newStudent.length; // fix this
//   const campusExist = campuses.campuses && campuses.campuses.length;
//   const inputStyle ={ marginBottom: "10px" }

//   return(
//     <div className="well">
//       <h3> Add new student </h3>
//       <form onSubmit={ props.handleSubmit }>
//         <div className="form-group">
//           <input name="name" type="text" 
//             className="form-control" style={ inputStyle }
//             placeholder="Enter a name"
//             onChange={ props.handleNameChange } 
//             value={ newStudent.name } />
//           <input name="email" type="text" 
//             className="form-control" style={ inputStyle }   
//             placeholder="Enter an email"
//             onChange={ props.handleEmailChange } 
//             value={ newStudent.email } />
//           <select>
//             <option>Select Campus</option>
//             {
//               campusExist && campuses.campuses.map(campus => {
//                 return (
//                   <option key={ campus.id }>{ campus.name }</option>
//                 )         
//               })
//             }

//           </select>
//         </div>
//         <div className="form-group">
//           <button disabled={ invalidInput } className="btn btn-primary">Add</button>
//         </div>
//       </form>
//     </div>
//   )
// }


// const mapStateToProps = (state) => {
//   return{
//     newStudent: state.newStudent,
//     campuses: state.campuses,
//     students: state.students
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     handleNameChange: (event) => {
//       dispatch(addNewStudent(event.target.value))
//     },
//     handleEmailChange: (event) => {
//       dispatch(addNewStudent(event.target.value))
//     },
//     handleSubmit: (event) => {
//       event.preventDefault();     
//       dispatch(postStudent(event.target.name.value, ownProps.history))
//     }
//   }
// }

// const studentFormContainer = withRouter(connect(mapStateToProps)(StudentForm))
// export default studentFormContainer;

