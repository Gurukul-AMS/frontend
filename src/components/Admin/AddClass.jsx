import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import querystring from 'querystring';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const semesters = [
  {
    value: 1,
    label: '1st',
  },
  {
    value: 2,
    label: '2nd',
  },
  {
    value: 3,
    label: '3rd',
  },
  {
    value: 4,
    label: '4th',
  },
  {
    value: 5,
    label: '5th',
  },
  {
    value: 6,
    label: '6th',
  },
  {
    value: 7,
    label: '7th'
  },
  {
    value: 8,
    label: '8th'
  }
];

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundImage: 'url(https://i.pinimg.com/originals/fa/cc/52/facc5292a1ba146e1410ef9983fc3aa7.jpg)',
    backgroundSize: 'cover',
    height:'100vh',
    maxWidth: '100%',
    overflow: 'hidden',
    objectFit: 'fill',
  },
  rooterStill: {
    border: '2px solid black',
    width: '35%',
    margin: '50px auto',
    paddingBottom: '50px',
    borderRadius: '10%',
    backgroundColor: 'white',
  },
  root: {
    '& .MuiTextField-root': {
      width: '30ch',
      display: 'flex',
      flexDirection: 'column',
      margin: '50px auto',
    },
  },
  limbo: {
    margin: 'auto',
    display: 'flex',
  },
  heading: {
    margin: '50px',
    textAlign: 'center',
    fontFamily: " 'Archivo Narrow', sans-serif",
  }
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [semester, setSemester] = React.useState('Select semester');
  const [section, changeSection] = React.useState();

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  const sectionChange = (event) => {
    changeSection(event.target.value);
  };

  function sendInfo(){

    setOpen(true);

    Axios.post("http://localhost:5000/api/addclass", querystring.stringify({section: section, semester: semester}),{
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        credentials: 'include',
        withCredentials: true
    }).then(response=>{
          if(response.data === 200) {
              console.log("Class added!");
          }
      })
      .catch(error => {
          console.log(error);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (<div className={classes.body}>
    <div className={classes.rooterStill}>
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.heading}>
          <h1 >Add Class</h1>
      </div>
      
      <div>

          
        <TextField
          id="outlined-select-semester"
          select
          label="Select"
          value={semester}
          onChange={handleChange}
          variant="outlined"
        >
          {semesters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div>
    <div>

        <TextField id="outlined-basic" label="Select Section" variant="outlined" value={section} onChange={sectionChange}/>
        <div className={classes.limbo}>
          <Button className={classes.limbo} variant="outlined" color="primary" onClick={sendInfo}>
              Add Class
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                  New Class Added!
              </Alert>
          </Snackbar>          
        </div>
      </div>
    </form>
    </div>
  </div>);
}