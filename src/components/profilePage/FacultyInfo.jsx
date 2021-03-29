import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  overall: {
    backgroundColor: '#301b3f',
    objectFit: 'fill',
    overflow: 'hidden',
    height: '100vh',
  },

  title: {
    display: 'flex',
    alignContent: 'center',
    flexBasis: '500px',
 
  },

  balance: {
    flex: '1 0 auto',
  },

  role: {
    margin: '50px auto',
    backgroundColor: 'white',
    flex: '1 0 auto',
    textAlign: 'center',
    paddingTop: '25px',
    fontSize: '3rem',
    fontFamily: "'Georgia', serif",
    border: '2px solid black',
    boxShadow: '10px 10px 10px black',
  },

  button: {
    flex: '1 0 auto',
    alignContent: 'center', 
    textAlign: 'center',
    margin: '50px auto',
    paddingTop: '30px',
  },

  topRow: {
    display: 'flex',
  },

  profilePic: {
    flex: '1',
    backgroundColor: 'white',
    borderRadius: '10%',
    margin: '20px 50px',
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '30px',
    border: '2px solid black',
    boxShadow: '10px 10px 10px black',

  },

  username: {
    flex: '2',
    backgroundColor: 'white',
    // borderRadius: '10%',
    margin: '30px 50px',
    border: '2px solid black',
    boxShadow: '10px 10px 10px black',
  },

  fullname: {
    flex: '2',
    backgroundColor: 'white',
    // borderRadius: '10%',
    margin: '30px 50px',
    border: '2px solid black',
    boxShadow: '10px 10px 10px black',
  },
  pic: {
    height: '10rem',
    width: '10rem',
  },

  h5: {
    margin: '30px',
  },
  h3: {
    margin: '30px',
  },

  midRow: {
    display: 'flex',
  },



});

export default function Info(props){

  const classes = useStyles();

  const [profile, updateProfile] = useState({});
  const [courses, updateCourses] = useState([]);

  function checkLogin(){
    Axios.get("http://localhost:5000/api/profile", {withCredentials: true}).then(response => {
      if(response.status === 200 && props.showThis === "LOGGED_IN") {
        // console.log(response);
        updateProfile(response.data);
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

  useEffect(() => {
    checkLogin();
    getCourses();
  });

  return (<div className={classes.overall}>
      <div className={classes.title}>
        <div className={classes.balance}>

        </div>
        <div className={classes.role}>
          <p>Faculty</p>
        </div>
        <div className={classes.button}>
          <Button size="large" variant="contained" color="primary" href="/faculty/edit">Edit</Button>
        </div>
      </div>
    <div className={classes.topRow}>
        <div className={classes.profilePic}>
            <img className={classes.pic} alt="Your Profile" src="../img/image.png"/>
        </div>
        <div className={classes.username}>
            <h5 className={classes.h5}>Username:</h5> 
            <h3 className={classes.h3}>{profile.username}</h3>
        </div>
        <div className={classes.fullname}>
            <h5 className={classes.h5}>Full Name:</h5> 
            <h3 className={classes.h3}>{profile.firstName+ " " + profile.lastName}</h3>
        </div>
    </div>
    <div className={classes.topRow}>
        <div className={classes.username}>
            <h5 className={classes.h5}>Email: </h5>
            <h3 className={classes.h3}>{profile.email}</h3>
        </div>
        <div>
          <h5 className={classes.h5}>Courses: </h5>
          {courses.map((course) => (
            <h3>{course.courseName}</h3>
          ))}
        </div>
    </div>
  </div>);
};