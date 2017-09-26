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
  
  return(
    <div>
      <div className="col-xs-12 col-sm-4 col-md-4"><h1>Campuses</h1> 
        <CampusForm render={ <CampusForm campuses={ campuses } /> }/>
      </div> 
      <div className="col-xs-12 col-sm-8 col-md-8" style={ listStyle }>  
      {
        campusExist && campuses.map(campus => { 
          return (       
            <div className="xol-sm-6 col-md-6 col-lg-3" key={ campus.id }>
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


const campusListContainer = withRouter(connect(mapStateToProps)(CampusList))
export default campusListContainer;






