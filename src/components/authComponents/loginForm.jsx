import {React, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import Button from '@material-ui/core/Button';

axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Form(props) {
  const classes = useStyles();

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
      if (response.data.role!== "Admin") {
        console.log(response.data);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('newUser',"true");
        window.location = `/profile/${response.data.role}`;          
      } else if(response.data.role === "Admin") {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('newUser',"true");
        window.location = `/admin/logs`;   
      }
      // console.log(response);
    });
  }
  
  const handleChange = (prop) => (event) => {
    updateInfo({ ...info, [prop]: event.target.value });
      // console.log(info);
  };

  return (
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
      <Button onClick={sendRequest} variant="outlined" color="primary">
        Submit
      </Button>
    </form>
  );
}