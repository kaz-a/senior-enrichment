import React, { Component } from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import CampusDetail from './CampusDetail';
import CampusForm from './CampusForm';


const CampusList = (props) => {
  
  const { campuses } = props;
  const campusExist = campuses && campuses.length;
  const listStyle = { marginTop: "69px" };
  const btnStyle = { fontSize: "1.5em", color: "grey" };

  return(
    <div>
      <div className="col-xs-12 col-sm-4 col-md-4"><h1>Campuses</h1> 
        <CampusForm render={ <CampusForm /> }/>
      </div> 
      <div className="col-xs-12 col-sm-8 col-md-8" style={ listStyle }>  
      {
        campusExist && campuses.map(campus => { 
          return (       
            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3" key={ campus.id }>
              <span className="fa fa-times pull-right" style={ btnStyle } aria-hidden="true"
                onClick={ props.handleSubmit }></span>
              <Link className="thumbnail" to={`/campuses/${campus.id}`} >
                <img src={ campus.image } />
                <div className="caption">
                  <span>{ campus.name }</span>
                </div>   
              
              </Link>
            </div>   
          )        
        })
      }

       </div>
    </div>
  )  
}


const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps)=> {
  return {
    handleSubmit: function(event){
      event.preventDefault();
      console.log("delete button clicked!")
      // dispatch(deleteCampus(campusId))
    }

  }
  
}


const campusListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusList))
export default campusListContainer;






