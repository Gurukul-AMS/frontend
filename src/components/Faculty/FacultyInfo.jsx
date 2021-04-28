import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({

    body: {
      backgroundColor: '#2b2e4a',
      backgroundSize: 'cover',
      maxWidth: '100%',
      overflow: 'hidden',
      objectFit: 'fill',
      height: '100vh'
    },

    root: {
      border: '2px solid black',
      width: '75%',
      margin: '50px auto 80px auto',
      paddingBottom: '50px',
      borderRadius: '2%',
      backgroundColor: 'white',
      boxShadow: '25px 25px 1px #301b3f',
    },

    h1: {
      textAlign: 'center',
      paddingTop: '50px',
    },

    basic: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '50px auto auto auto',
    },

    dp: {
      flex: '1',
      margin: '20px auto auto auto',
      width: '25%',
      height: '25%'
    },

    username: {
      flex: '1',
      textAlign: 'center',
    },

    actualName: {
      flex: '1',
      textAlign: 'center',
    },
    
    other: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '50px auto auto auto',
    },

    email: {
      flex: '1',
      textAlign: 'center',
      border: '2px solid black',
      paddingTop: '15px',
      marginLeft: '15px',
      marginRight: '15px',
      borderRadius: '2%',
    },

    courses: {
      flex: '1',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid black',
      paddingTop: '15px',
      marginRight: '15px',
      marginLeft: '15px',
      borderRadius: '2%',

    },

    button: {
      textAlign: 'center',
      margin: '30px auto 30px auto',
    },
});

export default function Info(props){

  const classes = useStyles();

  const [profile, updateProfile] = useState({});
  const [courses, updateCourses] = useState([]);
  const [pic, whichPic] = useState();

  function checkLogin(){
    Axios.get("http://localhost:5000/api/profile", {withCredentials: true}).then(response => {
      if(response.status === 200 && props.showThis === "LOGGED_IN") {
        // console.log(response);
        updateProfile(response.data);
        whichPic(response.data.profilePic.data);
      } else if(props.showThis === "NOT_LOGGED_IN") {
        window.location = `/logout`;   
      }
    })
    .catch(error => {
      console.log(error); 
    });
  }

  function getCourses(){
    Axios.get("http://localhost:5000/api/getcourses", {withCredentials: true}).then(response => {
      if(response.status === 200 && props.showThis === "LOGGED_IN") {
        // console.log(response.data);
        updateCourses(response.data);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  function courseList() {

    if(courses) {
      return (courses.map((course) => <div>
        <h4>{course.courseName}</h4>
      </div>));
    } else {
      return "Oops";
    }
  }

  function getPic() {

    // console.log(pic);

    if(pic) {
      return pic;
    } else {
      return "";
    }
  }

  useEffect(() => {
    checkLogin();
    getCourses();
  });

  return (<div className={classes.body}>
    <div className={classes.root}>
      <div className={classes.h1}>
        <h1>Faculty Profile</h1>
      </div>
      <div className={classes.basic}>
        <div className={classes.dp}>
          <span>
            <img alt="profile pic" src="./display_images/b67978f7-e998-49b8-a574-6253b3a5483a.jpg"/>
          </span>
        </div>
        <div className={classes.username}>
          <h4>Username</h4>
          <h3>{profile.username}</h3>
        </div>
        <div className={classes.actualName}>
          <h4>Full Name</h4>
          <h3>{profile.firstName + " " + profile.lastName}</h3>
        </div>
      </div>
      <div className={classes.other}>
        <div className={classes.email}>
          <h4>Email</h4>
          <h3>{profile.email + ""}</h3>
        </div>
        <div className={classes.courses}>
          <h4>Courses</h4>
          <h3>{courseList()}</h3>
        </div>
      </div>
      <div className={classes.button}>
        <a href="/faculty/edit">
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </a>
      </div>
    </div>
  </div>);
};