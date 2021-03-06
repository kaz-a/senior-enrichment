import React, { Component } from 'react';
import store, { fetchCampuses, createStudent, postStudent, writeStudentName, writeStudentEmail, selectStudentCampus, setStudentCampusId } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios'


const StudentForm = (props) => {
  const { campuses, newStudent, newStudentNameEntry, newStudentEmailEntry, newStudentCampusEntry, campusId } = props;
  const campusExist = campuses && campuses.length;
  const inputStyle ={ marginBottom: "10px" }

  return(
    <div className="well">
      <h3> Add new student </h3>
      <form onSubmit={ (event) => props.handleSubmit({ name: newStudentNameEntry, email: newStudentEmailEntry, campusId: newStudentCampusEntry }, event) }>
        <div className="form-group">
          <input name="name" type="text" 
            className="form-control" style={ inputStyle }
            placeholder="Enter a name"
            onChange={ props.handleNameChange } 
            value={ newStudentNameEntry } />
          <input name="email" type="text" 
            className="form-control" style={ inputStyle }   
            placeholder="Enter an email"
            onChange={ props.handleEmailChange } 
            value={ newStudentEmailEntry } />
          <select name="campus" className="form-control" onChange={ props.handleCampusChange }>
            <option>Select Campus</option>
            {
              campusExist && campuses.map(campus => {
                return (
                  <option key={ campus.id } value={ campus.id }>{ campus.name }</option>
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
    campuses: state.campuses,
    students: state.students,
    newStudent: state.newStudent,
    newStudentNameEntry: state.newStudentNameEntry,
    newStudentEmailEntry: state.newStudentEmailEntry,
    newStudentCampusEntry: state.newStudentCampusEntry
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleNameChange: (event) => {
      dispatch(writeStudentName(event.target.value))
    },
    handleEmailChange: (event) => {
      dispatch(writeStudentEmail(event.target.value))
    },
    handleCampusChange: (event) => {
      dispatch(selectStudentCampus(event.target.value))
    },
    handleSubmit: (newStudentEntry, event) => {
      event.preventDefault();
      dispatch(postStudent(newStudentEntry))

    }
  }
}

const studentFormContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentForm))
export default studentFormContainer;