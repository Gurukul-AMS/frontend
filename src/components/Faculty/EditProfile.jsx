import {React, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import querystring from 'querystring';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    form: {
        '& > *': {
          width: '25ch',
          display: 'flex',
          flexDirection: 'column',
          margin: '50px auto',
        },
    },

    body: {
        backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/58f8719c20099e4ee8f00783/1560858968195-3VYKW8C7IK00782IBJ8N/ke17ZwdGBToddI8pDm48kM_7jmUC-RyB-fa6m4uHSml7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UWVaKOtxYD4pZkIk17N8ApxkFHPhlbZftWDkZ8jkyPQ4vb3PiBfwt-qYfVQRKl72mQ/Wallpaper-Malavida-Green-Top-Image.jpg)',
        backgroundSize: 'cover',
        height:'100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    root: {
        border: '2px solid black',
        width: '35%',
        margin: '50px auto 80px auto',
        paddingBottom: '50px',
        borderRadius: '10%',
        backgroundColor: 'white',
    },

    heading: {
        textAlign: 'center',
        paddingTop: '50px',
    },

    button: {
        textAlign: 'center',
    }
}));

export default function EditStudentProfile() {
    
    const classes = useStyles();

    const [firstName, updateFirst] = useState();
    const [lastName, updateLast] = useState();
    const [email, updateMail] = useState();
    const [open, setOpen] = useState(false);

    function sendInfo() {

        setOpen(true);

        axios.post("http://localhost:5000/api/profile/edit", querystring.stringify({firstName: firstName, lastName: lastName, email: email}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then(response => {
            if(response.status === 200) {
                console.log("Successfully sent notification.");
            }
        });
    }

    function handleFirst(event) {
        updateFirst(event.target.value);
    }

    function handleLast(event) {
        updateLast(event.target.value);
    }

    function handleMail(event) {
        updateMail(event.target.value);
    }

    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    };

    return (<div className={classes.body}>
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1>Update Info</h1>
            </div>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={handleFirst}/>
                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={handleLast}/>
                <TextField id="outlined-basic" label="Email ID" variant="outlined" value={email} onChange={handleMail}/>
            </form>
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={sendInfo}>
                    Send Notification
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Notification(s) successfully sent!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    </div>);
}