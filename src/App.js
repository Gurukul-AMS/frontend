import {React, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/authComponents/Login";
import Signup from "./components/authComponents/Signup";
import Logout from "./components/authComponents/Logout";
import ViewLog from "./components/Admin/ViewLog";
import FacultyInfo from "./components/Faculty/FacultyInfo";
import StudentInfo from "./components/Student/StudentInfo";
import EditStudentProfile from "./components/Student/EditProfile";
import EditFacultyProfile from "./components/Faculty/EditProfile";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import UploadCal from "./components/Admin/uploadCalendar";
import AddClass from "./components/Admin/AddClass";
import AddCourse from "./components/Admin/AddCourse";
import AllUsers from "./components/Admin/AllUsers";
import UploadMarks from "./components/Faculty/UploadMarks";
import UploadAttend from "./components/Faculty/UploadAttend";
import ViewMarks from "./components/Student/ViewMarks";
import ViewAttend from "./components/Student/ViewAttend";
import SendCourse from "./components/Student/SendCourse";
import SendClass from "./components/Student/SendClass";
import ViewNotifs from "./components/Notifications/ViewNotifs";
import MakeNotif from "./components/makeNotif";
import {BrowserRouter as Router, Route, StaticRouter, Switch} from 'react-router-dom';
import './home.css';
import axios from 'axios';
import SERVER_URL from '../src/utils/backend';

function App() {

  const [state, changeState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: "",
  });

  function checkLoginStatus(){
    axios.get(`${SERVER_URL}/isloggedin`, {withCredentials: true}).then(response => {
      if(response.data && state.loggedInStatus === "NOT_LOGGED_IN"){
        changeState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.role
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
          {state.user === "Faculty"
            &&
            <Route exact
            path="/profile/faculty"
            render = {props => (
              <FacultyInfo {...props} showThis={state.loggedInStatus} currentUser={state.user}/>
            )}  
          />}
          {state.user === "Student"
            &&
            <Route exact
            path="/profile/student"
            render = {props => (
              <StudentInfo {...props} showThis={state.loggedInStatus} currentUser={state.user}/>
            )}  
          />}
          {state.user === "Admin"
            &&
            <Route exact
            path="/admin/calendar"
            component={UploadCal}
          />}
          {state.user === "Admin"
            &&
            <Route exact
            path="/admin/class"
            component={AddClass}
          />}
          {state.user === "Admin"
            &&
            <Route exact
            path="/admin/course"
            component={AddCourse}
          />}
          {state.user === "Admin"
            &&
            <Route exact
            path="/admin/users"
            component={AllUsers}
          />}
          {state.user === "Faculty"
            &&
            <Route exact
            path="/faculty/marks"
            component={UploadMarks}
          />}
          {state.user === "Faculty"
            &&
            <Route exact
            path="/faculty/attendance"
            component={UploadAttend}
          />}
          {state.user === "Faculty"
            &&
            <Route exact
            path="/faculty/edit"
            component={EditFacultyProfile}
          />}
          {state.user === "Faculty" || state.user === "Admin"
            &&
            <Route exact
            path= {"/faculty/notif" || "/admin/notif"}
            component={MakeNotif}
          />}             
          {state.user === "Student"
            &&
            <Route exact
            path="/student/course"
            component={SendCourse}
          />}
          {state.user === "Student"
            &&
            <Route exact
            path="/student/class"
            component={SendClass}
          />}
          {state.user === "Student"
            &&
            <Route exact
            path="/student/marks"
            component={ViewMarks}
          />}
          {state.user === "Student"
            &&
            <Route exact
            path="/student/attendance"
            component={ViewAttend}
          />}
          {state.user === "Student"
            &&
            <Route exact
            path="/student/edit"
            component={EditStudentProfile}
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
