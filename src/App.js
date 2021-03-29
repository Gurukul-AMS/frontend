import {React, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/authComponents/Login";
import Signup from "./components/authComponents/Signup";
import Logout from "./components/authComponents/Logout";
import ViewLog from "./components/Admin/ViewLog";
import FacultyInfo from "./components/profilePage/FacultyInfo";
import StudentInfo from "./components/profilePage/StudentInfo";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import UploadCal from "./components/Admin/uploadCalendar";
import AddClass from "./components/Admin/AddClass";
import AddCourse from "./components/Admin/AddCourse";
import AllUsers from "./components/Admin/AllUsers";
import UploadMarks from "./components/Faculty/UploadMarks";
// import Attendance from "./components/Attendance/App";
// import TestCase from "./components/Dropdown/App";
import SendCourse from "./components/Student/SendCourse";
import SendClass from "./components/Student/SendClass";
import ViewNotifs from "./components/Notifications/ViewNotifs";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './home.css';
import axios from 'axios';
import SERVER_URL from '../src/utils/backend';

function App() {

  const [state, changeState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  });

  function checkLoginStatus(){
    axios.get(`${SERVER_URL}/isloggedin`, {withCredentials: true}).then(response => {
      if(response.data && state.loggedInStatus === "NOT_LOGGED_IN"){
        changeState({
          loggedInStatus: "LOGGED_IN",
          user: response.data
        });
        // console.log(response);
      } else if(!response.data && state.loggedInStatus === "LOGGED_IN") {
        changeState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        });
      }
    })
    .catch(error => {
      console.log("There is an error in login", error);
    });
  };

  useEffect(() => {
    async function userLogInStatus() {
        await checkLoginStatus();
    }
    userLogInStatus();
  });

  return (
    <div className="App">

    <Router>
      <header className="App-header" >
      <div class="top"><Header showThis = {state.loggedInStatus} currentUser={state.user} className="top"/></div>
        <Switch>
          <Route exact 
            path="/"
            render = {props => (
              <Home {...props} showThis={state.loggedInStatus} currentUser={state.user}/>
            )}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact path="/calendar" component={Calendar}/>
          <Route exact path="/notifs" component={ViewNotifs}/>
          {/* <Route exact path="/attendance" component={Attendance}/>
          <Route exact path="/test" component={TestCase}/> */}
          <Route exact 
            path="/admin/logs" 
            render = {props => (
              <ViewLog {...props} showThis={state.loggedInStatus} currentUser={state.user}/>
            )} 
          />
          {state.user.role === "Faculty"
            &&
            <Route exact
            path="/profile/faculty"
            render = {props => (
              <FacultyInfo {...props} showThis={state.loggedInStatus} currentUser={state.user}/>
            )}  
          />}
          {state.user.role === "Student"
            &&
            <Route exact
            path="/profile/student"
            render = {props => (
              <StudentInfo {...props} showThis={state.loggedInStatus} currentUser={state.user}/>
            )}  
          />}
          {state.user.role === "Admin"
            &&
            <Route exact
            path="/admin/calendar"
            component={UploadCal}
          />}
          {state.user.role === "Admin"
            &&
            <Route exact
            path="/admin/class"
            component={AddClass}
          />}
          {state.user.role === "Admin"
            &&
            <Route exact
            path="/admin/course"
            component={AddCourse}
          />}
          {state.user.role === "Admin"
            &&
            <Route exact
            path="/admin/users"
            component={AllUsers}
          />}
          {state.user.role === "Faculty"
            &&
            <Route exact
            path="/faculty/marks"
            component={UploadMarks}
          />}
          {state.user.role === "Student"
            &&
            <Route exact
            path="/student/course"
            component={SendCourse}
          />}
          {state.user.role === "Student"
            &&
            <Route exact
            path="/student/class"
            component={SendClass}
          />}
        </Switch>
      </header>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
// export {userLoggedInContext};
