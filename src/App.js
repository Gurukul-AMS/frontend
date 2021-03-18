import {React, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/authComponents/Login";
import Signup from "./components/authComponents/Signup";
import Logout from "./components/authComponents/Logout";
import ViewLog from "./components/Admin/ViewLog";
import Info from "./components/profilePage/info";
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './home.css';
import axios from 'axios';

function App() {

  const [state, changeState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  });

  function checkLoginStatus(){
    axios.get("http://localhost:5000/api/isloggedin", {withCredentials: true}).then(response => {
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
      <div class="top"><Header showThis = {state.loggedInStatus} className="top"/></div>
        <Switch>
          <Route exact 
            path="/"
            render = {props => (
              <Home {...props} showThis={state.loggedInStatus} currentUser={state.user}/>
            )}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact 
            path="/admin/logs" 
            render = {props => (
              <ViewLog {...props} currentUser={state.user}/>
          )}/>
          <Route exact
            path="/profile"
            render = {props => (
              <Info {...props} showThis={state.loggedInStatus} currentUser={state.user}/>
            )}  
          />
        </Switch>
      </header>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
// export {userLoggedInContext};
