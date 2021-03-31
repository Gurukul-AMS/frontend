import {React, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import querystring from 'querystring';
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
    body: {
        backgroundImage: 'url(https://free4kwallpapers.com/uploads/originals/2020/12/28/purple-skyx-wallpaper.png)',
        backgroundSize: 'cover',
        height:'90vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },
    container: {
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
    root: {
      '& .MuiTextField-root': {
        width: '25ch',
        display: 'flex',
        flexDirection: 'column',
        margin: '50px auto',
      },
    },
    button: {
        textAlign: 'center',
    }
}));

export default function SendCourse() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [allClasses, changeClasses] = useState(["Nothing much", "Happens here"]);
    const [whichClass, thisClass] = useState("None");

    function getClasses() {
        Axios.get("http://localhost:5000/api/sendclass", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                changeClasses(response.data);
                // console.log(allClasses);
                // console.log("Bruh");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendInfo() {

        setOpen(true);

        Axios.post("http://localhost:5000/api/sendclass", querystring.stringify({class: whichClass}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        }).then(response => {
            if(response.status === 200) {
                console.log("Marks successfully updated");
                window.location = `/profile/Student`;
            }
        });
    };

    function classOptions() {
        return (allClasses.map((option) => <MenuItem key={option._id} value={option._id}>
        Semester {option.semester} - Section {option.section}
      </MenuItem>));
    };

    useEffect(() => {
        getClasses();
    });

    const handleChange = (event) => {
        thisClass(event.target.value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    };

    return ( <div className={classes.body}>
            <div className={classes.container}>
                <div className={classes.heading}>
                    <h1>Select Class</h1>
                </div>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={whichClass}
                            onChange={handleChange}
                            helperText="Please select your class"
                            variant="outlined"
                        >
                            {classOptions()}
                        </TextField>
                    </div>
                </form>
                <div className={classes.loop}>
                    <div className={classes.button}>
                        <Button variant="contained" color="primary" onClick={sendInfo}>
                            Submit
                        </Button>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Notification Sent!
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </div>
    </div>);
};

