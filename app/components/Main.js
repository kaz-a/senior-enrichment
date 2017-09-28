import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import StudentList from './StudentList';
import CampusList from './CampusList';
import CampusDetail from './CampusDetail';
import StudentDetail from './StudentDetail';
import store, { fetchCampuses, fetchStudents } from '../store';

 
export default class Main extends Component {

  componentDidMount () {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudents());
  }

  render() {  
    return(
      <div className="container">  
        <Navbar /> 
        <main>
          <Switch>
            <Route exact path="/" component={ CampusList } />
            <Route exact path="/students" component={ StudentList } />
            <Route path="/campuses/:id" component={ CampusDetail } />
            <Route path="/students/:id" component={ StudentDetail } />
          </Switch>
        </main>
      </div>
    )
  }
}


