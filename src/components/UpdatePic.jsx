import Axios from 'axios';
import {React, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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
        borderRadius: '5%',
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

    const [pic, updatePic] = useState("");

    function sendPic(){

        const formData = new FormData();
        
        formData.append("image", pic);

        setOpen(true);

        Axios.post("http://localhost:5000/api/uploadpic", formData).then(response=> {
            if(response.status === 200) {
                console.log("Success!");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function handleChange(event){
        updatePic(event.target.files[0]);
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
                <h3>Upload Profile Pic:</h3>
            </div>
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
                        Choose Profile Picture
                    </Button>
                </label>
                <div>
                    <Button color="primary" variant="contained" onClick={sendPic}>
                        Upload
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Profile Picture Uploaded!
                        </Alert>
                    </Snackbar>                    
                </div>
            </div>
        </div>
    </div>);
}