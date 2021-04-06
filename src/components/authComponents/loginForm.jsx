import {React, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={20} variant="filled" {...props} />;
};

axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '25ch',
      display: 'flex',
      margin: '30px auto auto auto',
    },
  },

  body: {
    height: '300px',
  },

  button: {
    textAlign: 'center',
    margin: '40px auto auto auto',
  }
}));

export default function Form(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [info, updateInfo] = useState({
    role: String,
    username: String,
    password: String
  });

  function sendRequest() {

    axios.post(`http://localhost:5000/api/login`, querystring.stringify({role: props.role, username: info.username, password: info.password}), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      credentials: 'include',
      withCredentials: true
    }).then(function(response){

      console.log(response.data);

      if (response.data.role === "Student" || response.data.role === "Faculty") {
        console.log(response.data);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('newUser',"true");
        window.location = `/profile/${response.data.role}`;          
      } else if(response.data.role === "Admin") {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('newUser',"true");
        window.location = `/admin/logs`;   
      } 
    })
    .catch(error => {
      console.log("Did something happen?");
      setOpen(true);
      console.log(error);
    })
  }
  
  const handleChange = (prop) => (event) => {
    updateInfo({ ...info, [prop]: event.target.value });
      // console.log(info);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (<div className={classes.body}>
    <form className={classes.root} noValidate autoComplete="off">

      <div>

        <TextField
          required
          id="outlined-required"
          label="Name"
          value={info.username}
          variant="outlined"
          onChange = {handleChange('username')}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={info.password}
          onChange = {handleChange('password')}
        />

      </div>
      <div className={classes.button}>
        <Button onClick={sendRequest} variant="outlined" color="primary">
          Submit
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Incorrect Credentials
            </Alert>
        </Snackbar>
      </div>
    </form>
  </div>);
}