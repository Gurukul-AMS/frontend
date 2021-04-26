import {React, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props) {

    var path="";
    var value="";
    
    if(props.showThis === "NOT_LOGGED_IN")
    {
      path = "/login";
      value = "Login";
    }
    else if(props.showThis === "LOGGED_IN")
    {
      var role = props.currentUser;
      if(role === "Admin")
      {
        path = "/admin/logs";
        value = "View Logs";
      }
      else
      {
        path = "/profile/" + role;
        value = "View Profile";
      }
    }

    return (<Jumbotron>
        <h1>Welcome to Gurukul</h1>
        <p>
          Gurukul is an academic management system (AMS) built with the faculty members in mind.
        </p>
        <p>

        </p>
        <p>
          <Button variant="primary" href={path}>{value}</Button>
        </p>
      </Jumbotron>);
};
