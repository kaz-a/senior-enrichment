import React, { Component } from 'react';
import store, { selectStudentCampus, updateStudent, deleteStudent } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import StudentDetail from './StudentDetail';


const StudentList = (props) => {

  const { students, campuses, newStudentCampusEntry, studentToUpdate } = props;
  const studentsExist = students && students.length;
  const campusExist = campuses && campuses.length;
  const listStyle = { marginTop: "69px" };

  return (
    <div>
      <div className="row col-xs-12 col-sm-4 col-md-4"><h1>Students</h1> 
        <StudentForm render={ <StudentForm /> }/>
      </div>

      <div className="col-xs-12 col-sm-8 col-md-8" style={ listStyle }>  
        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Campus</th> 
              <th></th>
              <th></th>             
            </tr>
          </thead>
          <tbody>
          {
            studentsExist && students.map(student => {
              return( 
                <tr key={ student.id }>      
                  <th scope="row">{ student.id }</th>
                  <td><Link to={`/students/${student.id}`}>{ student.name }</Link></td>
                  <td>
                    <select value={ student.campus.name } className="form-control" 
                      onChange={ (event) => props.handleChageCampusName(studentToUpdate.id, event) }>  
                      {
                        campusExist && campuses.map(campus => {
                          return (
                            <option key={ campus.id }>{ campus.name }</option>
                          )         
                        })
                      }
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-warning"
                      onClick={ (event) => props.handleSubmitUpdate(event) } >Update</button>
                  </td> 
                  <td>
                    <button className="btn btn-sm btn-danger"
                      onClick={ (event) => props.handleSubmitDelete(student.id, event) }>Delete</button>
                  </td> 
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>    

  )
}

const mapStateToProps = (state) => {
  return{
    students: state.students,
    campuses: state.campuses, 
    newStudentCampusEntry: state.newStudentCampusEntry,
    studentToUpdate: state.studentToUpdate
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChageCampusName: function(studentId, event){
      console.log(event.target.value)
      dispatch(selectStudentCampus(event.target.value))
    }, 
    handleSubmitDelete: function(studentId, event){
      event.preventDefault();
      dispatch(deleteStudent(studentId))
    },
    handleSubmitUpdate: function(event){
      event.preventDefault();
      console.log("update button clicked!")
      // dispatch(updateStudent(studentId, updateInfo))
    }
  }

}
  
const studentListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList))
export default studentListContainer;

