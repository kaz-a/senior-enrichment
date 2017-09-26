import React, { Component } from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'


const CampusDetail = (props) => {
  const { campuses } = props;
  const campusId = +props.match.params.id;
  const campusExist = campuses && campuses.length 

  return(
    <div> 
      {
      campusExist && campuses.filter(campus => {
        return campus.id === campusId
      }).map(campus => {
        return (
          <div key={ campus.id }>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h1>{ campus.name } Campus</h1>
              has <strong>{ campus.students.length }</strong> students
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8">   
              <ul className="list_group" key={ campus.id }>
              {
                campus.students.map(student => {
                  return (
                    <li className="list-group-item" key={ student.id }>
                      <Link to={`/students/${student.id}`}><strong>{ student.name }</strong> <br/> 
                      { student.email }</Link>
                    </li>
                  )
                })
              }
              </ul>
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
    campuses: state.campuses
  }
}

const campusDetailContainer = withRouter(connect(mapStateToProps)(CampusDetail))
export default campusDetailContainer;

