import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Logout from "../authComponents/Logout";
import './info.css';

export default function Info(props){

  const [profile, updateProfile] = useState({});

  function checkLogin(){
    Axios.get("http://localhost:5000/api/profile", {withCredentials: true}).then(response => {
      if(response.status === 200 && props.showThis === "LOGGED_IN") {
        //console.log(response.data);
        updateProfile(response.data);
      } else if(props.showThis === "NOT_LOGGED_IN") {
        return <Logout/>
      }
    })
    .catch(error => {
      console.log(error); 
    });
  }

  useEffect(() => {
    checkLogin();
  });

  return (<div className="overall">
      <div className="title">
          <h1>Student</h1>
          <button>Edit</button>
      </div>
    <div className="toprow">
        <div className="profilePic">
            <img className="pic" alt="Your Profile" src="../img/image.png"/>
        </div>
        <div className="username">
            <h5>Username:</h5> 
            <h3>{profile.username}</h3>
        </div>
        <div className="fullname">
            <h5>Full Name:</h5> 
            <h3>{profile.firstName+ " " + profile.lastName}</h3>
        </div>
    </div>
    <div className="midrow">
        <div className="email">
            <h5>Email: </h5>
            <h3>{profile.email}</h3>
        </div>
        <div className="whichClass">
            <h5>Semester: </h5>
            <h3>{profile.semester}</h3>
            <h5>Section: </h5>
            <h3>{profile.section}</h3>
        </div>
        <div className="whichCourse">
            <h5>Courses: </h5>
            <h3>{profile.courses}</h3>
        </div>

    </div>
  </div>);
};