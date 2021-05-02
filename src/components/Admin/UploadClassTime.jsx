import Axios from 'axios';
import {React, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
        width: '25ch',
        display: 'flex',
        flexDirection: 'column',
        margin: '50px auto',
    },
  },

  body: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1495482432709-15807c8b3e2b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80)',
        backgroundSize: 'cover',
        height:'100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
  },

  block: {
        border: '2px solid black',
        width: '35%',
        margin: '50px auto 80px auto',
        paddingBottom: '50px',
        borderRadius: '10%',
        backgroundColor: 'white',
  },

  input: {
      display: 'none',
  },

  heading: {
      margin: '30px auto 30px auto',
      textAlign: 'center',
  },

  buttons: {
      textAlign: 'center',
  }
}));

export default function UploadClassTime(){

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [latest, updateLatest] = useState("");
    const [classList, updateList] = useState([]);
    const [semester, whichSem] = useState("");
    const [section, whichSec] = useState("");
    const [thisclass, whichClass] = useState("");

    function getClasses(){

        Axios.get("http://localhost:5000/api/getclasses", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateList(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendTime(){

        const formData = new FormData();

        handleClass();
        
        formData.append("class", thisclass);
        formData.append("image", latest);

        setOpen(true);

        Axios.post("http://localhost:5000/api/class/uploadtime", formData).then(response=> {
            if(response.status === 200) {
                console.log("Success!");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendSems(){
        if(classList) {
            return (classList.map((option) => <option key={option.semester} value={option.semester}>
            Semester {option.semester}
          </option>));
        } else {
            return "Oops!";
        }
    }

    function sendSecs(){
        if(classList) {
            return (classList.map((option) => <option key={option.section} value={option.section}>
            Section {option.section}
          </option>));
        } else {
            return "Bruh";
        }
    }

    useEffect(() => {
        getClasses();
    }); 

    function handleChange(event){
        updateLatest(event.target.files[0]);
    }

    function handleSem(event){
        whichSem(event.target.value);
    }

    function handleSec(event){
        whichSec(event.target.value);
    }

    function handleClass(){

        classList.forEach(function(one){
            if(one.semester === semester && one.section === section) {
                whichClass(one._id);
            }
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    }

    return (<div className={classes.body}>
        <div className={classes.block}>
            <div className={classes.heading}>            
                <h3>Upload Time Table for Class:</h3>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                id="outlined-select-semester"
                select
                label="Select"
                value={semester}
                onChange={handleSem}
                helperText="Please select the semester"
                variant="outlined"
                >
                {sendSems()}
                </TextField>
                <TextField
                id="outlined-select-section"
                select
                label="Select"
                value={section}
                onChange={handleSec}
                helperText="Please select the section"
                variant="outlined"
                >
                {sendSecs()}
                </TextField>
            </div>
            </form>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                filename="image"
                onChange={handleChange}
            />
            <div className={classes.buttons}>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" >
                        Choose Time Table
                    </Button>
                </label>
                <div>
                    <Button color="primary" variant="contained" onClick={sendTime}>
                        Upload
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Time Table Uploaded!
                        </Alert>
                    </Snackbar>                    
                </div>
            </div>
        </div>
    </div>);
}