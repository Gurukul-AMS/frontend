import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
    root: {
        border: '2px solid black',
        width: '40%',
        margin: '20px auto',
        paddingBottom: '50px',
        borderRadius: '10%',
        backgroundColor: 'white',
    },

    body: {
        backgroundImage: 'url(https://i.pinimg.com/originals/0e/ad/eb/0eadebe7a808c205e802b0f088b35821.jpg)',
        backgroundSize: 'cover',
        height:'100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    form: {
        '& .MuiTextField-root': {
            width: '30ch',
            display: 'flex',
            flexDirection: 'column',
            margin: '50px auto',
        },
    },

    heading: {
        margin: '50px',
        textAlign: 'center',
        fontFamily: " 'Archivo Narrow', sans-serif",
    },

    button: {
        margin: 'auto',
        display: 'flex',
        textAlign: 'center',
    }
}));

export default function UpdateClass() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [courseList, updateList] = useState([]);
    const [whichCourse, updateCourse] = useState();
    const [studList, updateStudents] = useState([]);
    const [whichStudent, thisStudent] = useState();

    function getStudents() {

        axios.get("http://localhost:5000/api/class", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateStudents(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function getCourses() {

        axios.get("http://localhost:5000/api/getcourses", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateList(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendStudent() {

        setOpen(true);

        axios.post("http://localhost:5000/api/course", querystring.stringify({studentName: whichStudent, course: whichCourse}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then(response => {
            if(response.status === 200) {
                console.log("Class updated.");
            }
        });
    }

    function courseOptions() {
        if(courseList) {
            return courseList.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                    {option.courseName}
                </MenuItem>));
        } else {
            return "Sorry";
        }
    }

    function studentOptions() {
        if(studList) {
            return studList.map((stud) => (        
            <MenuItem key={stud.username} value={stud.username}>
                {stud.username}
            </MenuItem>));
        } else {
            return "Error";
        }
    }

    useEffect(() => {
        getStudents();
        getCourses();
    });

    const handleStudent = (event) => {
        thisStudent(event.target.value);
    }

    const handleCourse = (event) => {
        updateCourse(event.target.value);
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
                <h1>Update Course</h1>
            </div>
            <form className={classes.form} noValidate autoComplete="off">
                <div>
                    <TextField
                    id="outlined-select-course"
                    select
                    label="Select"
                    value={whichCourse}
                    onChange={handleCourse}
                    helperText="Please select the course"
                    variant="outlined"
                    >
                    {courseOptions()}
                    </TextField>
                    <TextField
                    id="outlined-select-student"
                    select
                    label="Select"
                    value={whichStudent}
                    onChange={handleStudent}
                    helperText="Please select the student"
                    variant="outlined"
                    >
                    {studentOptions()}
                    </TextField>                   
                </div>
            </form>
            <div>
                <Button className={classes.button} variant="contained" color="primary" onClick={sendStudent}>
                    Update Course
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Notification Sent!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    </div>)
}