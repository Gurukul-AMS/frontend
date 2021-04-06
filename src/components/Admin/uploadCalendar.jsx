import Axios from 'axios';
import {React, useState} from 'react';
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

export default function Upload(){

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [latest, updateLatest] = useState("");
    const [session, updateSession] = useState("");

    function changeCalendar(){

        const formData = new FormData();
        
        formData.append("whichYear", session);
        formData.append("image", latest);

        setOpen(true);

        Axios.post("http://localhost:5000/api/addcalendar", formData).then(response=> {
            if(response.status === 200) {
                console.log("Success!");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleSession = (event) => {
        updateSession(event.target.value);
    }

    function handleChange(event){
        updateLatest(event.target.files[0]);
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
                <h3>Upload Calendar:</h3>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Session" variant="outlined" value={session} onChange={handleSession}/>
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
                        Choose Calendar
                    </Button>
                </label>
                <div>
                    <Button color="primary" variant="contained" onClick={changeCalendar}>
                        Upload
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Calendar Uploaded!
                        </Alert>
                    </Snackbar>                    
                </div>
            </div>
        </div>
    </div>);
}