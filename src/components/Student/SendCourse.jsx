import {React, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import querystring from 'querystring';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
    body: {
        backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/purple-moon-stars-buildings-city-minimal-4k-gp.jpg)',
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
    button: {
        textAlign: 'center',
    },
    root: {
      '& .MuiTextField-root': {
        width: '25ch',
        display: 'flex',
        flexDirection: 'column',
        margin: '50px auto',
      },
    },
}));

export default function SendCourse() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [courses, changeCourses] = useState(["Nothing much", "Happens here"]);
    const [whichCourse, thisCourse] = useState("None");

    function getCourses() {
        Axios.get("http://localhost:5000/api/sendcourse", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                changeCourses(response.data);
                // console.log(courses);
                // console.log("Bruh");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendInfo() {

        setOpen(true);
        
        Axios.post("http://localhost:5000/api/sendcourse", querystring.stringify({}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        }).then(response => {
            if(response.status === 200) {
                console.log("Marks successfully updated");
            }
        });
    }

    function courseOptions() {
        return (courses.map((course) => <MenuItem key={course._id} value={course._id}>
        {course.courseName}
      </MenuItem>))
    }

    useEffect(() => {
        getCourses();
    });

    const handleChange = (event) => {
        thisCourse(event.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    };

    return (<div className={classes.body}>
        <div className={classes.container}>
            <div className={classes.heading}>
                <h1>Register for Course</h1>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="outlined-select-course"
                        select
                        label="Select"
                        value={whichCourse}
                        onChange={handleChange}
                        helperText="Please select your course"
                        variant="outlined"
                    >
                        {courseOptions()}
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
    </div>
);

};

