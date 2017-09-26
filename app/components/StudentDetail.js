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
            <div className="col-xs-12 col-md-4">
              <img src="/images/profile.png" />
            </div>
            <div className="col-xs-12 col-md-8">
              <h1>{ student.name }</h1>
              Email: { student.email } <br/>
              Campus: <Link to={`/campuses/${student.campus.id}`}>{ student.campus.name } </Link>
              
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

