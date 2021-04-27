import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Logout from "../authComponents/Logout";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({

  body: {
    backgroundColor: '#2b2e4a',
    backgroundSize: 'cover',
    maxWidth: '100%',
    overflow: 'hidden',
    objectFit: 'fill',
    height: '200vh'
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
    textAlign: 'center'
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

  },

  sem: {
    flex: '1',
    textAlign: 'center',

  },

  sec: {
    flex: '1',
    textAlign: 'center',

  },

  button: {
    textAlign: 'center',
    margin: '30px auto 30px auto',
  },

});

export default function Info(props){

  const classes = useStyles();

  const [profile, updateProfile] = useState({});
  const [pic, whichPic] = useState();
  const [whichClass, updateClass] = useState([]);

  function getClass(){
    Axios.get("http://localhost:5000/api/getclasses", {withCredentials: true}).then(response => {
      if(response.status === 200) {
        updateClass(response.data);
        whichPic(response.data.profilePic.data);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  function checkLogin(){
    
    Axios.get("http://localhost:5000/api/profile", {withCredentials: true}).then(response => {
      if(response.status === 200 && props.showThis === "LOGGED_IN") {
        // console.log(response.data);
        updateProfile(response.data);
        getClass();
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
    getClass();
  });

  function sendSem() {
    if(whichClass.length!==0) {
      var thisClass = whichClass[0];
      return thisClass.semester;
    } else {
      return "None";
    }
  }

  function sendSec() {
    if(whichClass.length!==0) {
      var thisClass = whichClass[0];
      return thisClass.section;
    } else {
      return "None";
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

  return (<div className={classes.body}>
    <div className={classes.root}>
      <div className={classes.h1}>
        <h1>Student Profile</h1>
      </div>
      <div className={classes.basic}>
        <div className={classes.dp}>
          <span>
            <img alt="profile pic" src={getPic()}/>
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
        <div className={classes.sem}>
          <h4>Semester</h4>
          <h3>{sendSem()}</h3>
        </div>
        <div className={classes.sec}>
          <h4>Section</h4>
          <h3>{sendSec()}</h3>
        </div>
      </div>
      <div className={classes.button}>
        <a href="/student/edit">
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </a>
      </div>
    </div>
  </div>);
};