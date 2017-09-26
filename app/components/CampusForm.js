import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import store, { postCampus, writeCampusName } from '../store';

const CampusForm = (props) => {
  console.log("props:", props)
  const { newCampus, newCampusEntry } = props;
  const inputStyle ={ marginBottom: "10px" }
  
  
  return(
    <div className="well">
      <h3> Add new campus </h3>
      <form onSubmit={ (event) => props.handleSubmit(newCampusEntry, event) }>
        <div className="form-group">
          <input name="name" type="text" 
            className="form-control" style={ inputStyle }
            placeholder="Enter a name"
            onChange={ props.handleChange } 
            value={ newCampusEntry } />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  )
}


const mapStateToProps = (state) => {
  return{
    newCampus: state.newCampus,
    newCampusEntry: state.newCampusEntry   
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: function(event) {
      dispatch(writeCampusName(event.target.value))
    },
    
    handleSubmit: function(newCampusEntry, event){
      event.preventDefault(); 
      dispatch(postCampus(newCampusEntry))
    }
  }
}

const campusFormContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusForm))
export default campusFormContainer;






