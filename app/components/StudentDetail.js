import React, { Component } from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'


const StudentDetail = (props) => {
  const { students } = props;
  const studentId = +props.match.params.id;
  const studentExist = students && students.length 

  return(
    <div> 
    {
      studentExist && students.filter(student => {
        return student.id === studentId
      }).map(student => {
        return (
          <div key={ student.id }>
            <div className="col-xs-12">
              <h1>{ student.name }</h1>
              Email: { student.email } <br/>
              Campus: { student.campus.name } 
              
            </div>
          </div>
        )
      })       
    }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

const studentDetailContainer = withRouter(connect(mapStateToProps)(StudentDetail))
export default studentDetailContainer;

