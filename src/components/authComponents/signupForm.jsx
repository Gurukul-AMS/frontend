import {React, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import Button from '@material-ui/core/Button';

axios.defaults.withCredentials = true;

const roles = [
  {
    value: "Student",
    label: "Student",
  },
  {
    value: "Faculty",
    label: "Faculty",
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields() {
  
  const classes = useStyles();
  
  const [info, updateInfo] = useState({
    role: String,
    username: String,
    password: String
  });

  function sendRequest() {

    axios.post(`http://localhost:5000/api/register`, querystring.stringify({role: info.role, username: info.username, password: info.password}), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      credentials: 'include',
      withCredentials: true
    }).then(function(response){
      if (response.status === 200) {
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('newUser',"true");
        window.location = `/profile/${response.data.username}`          
      }
      console.log(response);
    });
  }
  
  const handleChange = (prop) => (event) => {
    updateInfo({ ...info, [prop]: event.target.value });
    console.log(info);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="outlined-select-currency"
          select
          label="Select"
          value={info.role}
          onChange={handleChange('role')}
          helperText="Enter your role"
          variant="outlined"
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>

        <TextField
          required
          id="outlined-required"
          label="Username"
          variant="outlined"
          onChange = {handleChange('username')}
          value = {info.username}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange = {handleChange('password')}
        />
      </div>
      <Button onClick={sendRequest} variant="outlined" color="primary">
        Submit
      </Button>
    </form>
  );
}
    