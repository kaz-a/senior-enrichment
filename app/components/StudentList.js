import React, { Component } from 'react';
import store, { deleteStudent } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import StudentDetail from './StudentDetail';


const StudentList = (props) => {

  const { students, campuses } = props;
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
                    <select className="form-control" 
                      onChange={ props.handleChageCampusName }>  
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
                    <button className="btn btn-sm btn-warning">Update</button>
                  </td> 
                  <td>
                    <button className="btn btn-sm btn-danger"
                      onClick={ (event) => props.handleClick(student.id, event) }>Delete</button>
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
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChageCampusName: function(event){
      console.log(event.target.value)
      // call a PUT request
    }, 
    handleClick: function(studentId, event){
      event.preventDefault();
      dispatch(deleteStudent(studentId))
    }
  }

}
  
const studentListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList))
export default studentListContainer;

