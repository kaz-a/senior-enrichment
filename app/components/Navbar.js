import React, { Component } from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render(){
    const navbarStyle = { padding: "24px", width: "100%" };
    const containerStyle = { width: "100%", whiteSpace: "nowrap", overflow: "hidden" } 
    const brandStyle = { color: "white" };

    return(
      
      <nav className="navbar navbar-inverse navbar-default navbar-static-top" 
        role="navigation" style={ navbarStyle }>
        <div className="container" style={ containerStyle }>

          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            
            <a href="/" className="navbar-brand" style={ brandStyle }> 
              <span className="fa fa-graduation-cap" aria-hidden="true"></span>
               &nbsp;&nbsp;Interplanetary Academy
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/" >Campuses</Link> </li>
              <li><Link to="/students" >Students</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      
    )
  }

}


