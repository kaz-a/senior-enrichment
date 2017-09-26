import React, { Component } from 'react';
import store, { deleteStudent } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import StudentDetail from './StudentDetail';


const StudentList = (props) => {
  console.log("props:", props)

  const { students, campuses } = props;
  const studentsExist = students && students.length;
  const captionStyle = { paddingBottom: "26px" },
    bottonStyle = { marginTop: "-8px" },
    wellStyle = { paddingBottom: "36px" },
    listStyle = { marginTop: "69px" };

  const studentId = +props.match.params.id;
  console.log("studentId:", props)

  return (
    <div>
      <div className="row col-xs-12 col-sm-4 col-md-4"><h1>Students</h1> 
        <StudentForm render={ <StudentForm students={ students } campuses={ campuses } /> }/>
      </div>
      <div className="col-xs-12 col-sm-8 col-md-8" style={ listStyle }>  
        <div className="well" style={ wellStyle }>
          <div className="col-xs-3 col-md-3">ID</div>
          <div className="col-xs-3 col-md-3">Name</div>
          <div className="col-xs-3 col-md-3">Campus</div>
          <div className="col-xs-3 col-md-3"></div>
        </div>
        {
          studentsExist && students.map(student => {
            return(       
              <div className="col-xs-12 col-md-12" key={ student.id }>
                <Link className="thumbnail" to={`/students/${student.id}`}> 
                
                  <div className="caption" style={ captionStyle }>
                    <span>
                      <div className="col-xs-3 col-md-3">{ student.id }</div>
                      <div className="col-xs-3 col-md-3">{ student.name }</div>
                      <div className="col-xs-3 col-md-3">{ student.campus.name }</div>
                      <div className="col-xs-3 col-md-3">
                        <button className="btn btn-danger pull-right" 
                          style={ bottonStyle }>
                          Delete
                        </button>

                      </div>
                    </span>
                    
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
  return{
    students: state.students
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     handleDelete(studentId){
//       console.log("handleDelete fired", studentId)
//       dispatch(deleteStudent(studentId))
//       // dispatch(deleteStudent(event.target.value, ownProps.history))
//     }
//     // handleChange(event){
//     //   dispatch(writeChannel(event.target.value))
//     // },
//     // handleSubmit(event){
//     //   event.preventDefault();     
//     //   // ownProps has `history`, `match`, `location` properties PLUS
//     //   // custom properties passed into from parent
//     //   // use ChannelName which is the 'name' attr of the input tag
//     //   // and is available as a key for event.target object
//     //   dispatch(postChannel(event.target.channelName.value, ownProps.history))
//     // }
//   }

// }

  
const studentListContainer = withRouter(connect(mapStateToProps)(StudentList))
export default studentListContainer;













