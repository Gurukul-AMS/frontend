import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import querystring from 'querystring';

function MiniAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: '50px auto auto auto',
          width: '25ch',
        },
    },
    'body': {
        height: '100%',
    },

    base: {
        background: '#7F00FF',  /* fallback for old browsers */
        background: '-webkit-linear-gradient(to right, #E100FF, #7F00FF)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to top, #E100FF, #7F00FF)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        backgroundSize: 'cover',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
        height: '100vh'
    },

    block: {
        margin: '50px auto auto auto',
        textAlign: 'center',
        backgroundColor: 'white',
        width: '1000px',
        paddingTop: '50px',
        paddingBottom: '100px',
        borderRadius: '2%',
        border: '2px solid black'
    },

    button: {
        margin: '30px auto',
    },

    alert: {
        paddingTop: '20px',
        width: '80%',
        margin: 'auto',
    },

    nodata: {
        textAlign: 'left',
        width: '100%'
    },

    send: {
        backgroundColor: '#810000',
        color: 'white',
        '&:hover': {
            backgroundColor: '#ac0d0d'
        },
        marginBottom: '20px'
    },

    single: {
        display: 'flex',
        flexDirection: 'column',
    }


}));

export default function SendAlert(){
    
    const classes = useStyles();

    const [courseList, updateList] = useState([]);
    const [studList, updateStud] = useState([]);
    const [course, whichCourse] = useState("");
    const [student, whichStudent] = useState("");
    const [present, updatePresent] = useState("");
    const [absent, updateAbsent] = useState("");
    const [courseName, updateName] = useState("");

    const [open, setOpen] = useState(false);

    function getCourses(){
        axios.get("http://localhost:5000/api/sendalert", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateList(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function getRecord(){
        axios.post("http://localhost:5000/api/viewpresent", querystring.stringify({course: course, student: student}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then(response => {
            if(response.status === 200) {
                updatePresent(response.data);
                console.log(response.data);
            }
        });

        axios.post("http://localhost:5000/api/viewabsent", querystring.stringify({course: course, student: student}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then(response => {
            if(response.status === 200) {
                updateAbsent(response.data);
                console.log(response.data);
            }
        });
    }

    function sendMessage(){

        setOpen(true);
        axios.post("http://localhost:5000/api/sendalert", querystring.stringify({course: courseName, student: student}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then(response => {
            if(response.status === 200) {
                console.log(response.data);
                updateList([]);
                updateStud([]);
                whichCourse("");
                whichStudent("");
                updatePresent("");
                updateAbsent("");
                updateName("");
            }
        });
    }

    function courseOptions(){
        if(courseList) {
            return (courseList.map((option) => <MenuItem key={option._id} value={option._id}>
                {option.courseName} - Semester {option.semester}
            </MenuItem>));
        } else {
            return "Oops";
        }
    }

    function studentOptions(){

        // console.log(studList);
        if(studList) {
            return (studList.map((option) => <MenuItem key={option} value={option}>
                {option}
            </MenuItem>));
        } else {
            return "Oops";
        }
    }

    function shouldButton(safe){

        if(safe) {
            return;
        } else {
            return (<Button variant="contained" className={classes.send} onClick={sendMessage}>
            Send Alert
        </Button>);
        }
    }

    function showData() {

        if(present && absent){

            var denom = present + absent;
            var perc = present/denom * 100;
            var safe = (perc >=75) ? true : false;
            
            return (<div className={classes.single}>
                <Alert severity={safe ? "success" : "error"} className={classes.nodata}>
                  <AlertTitle>{perc}% classes attended</AlertTitle>
                  {safe ? "No alert required" : "Needs to attend more classes"}
              </Alert>
              {shouldButton(safe)}
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MiniAlert onClose={handleClose} severity="success">
                    Notification Sent!
                </MiniAlert>
            </Snackbar>
      </div>);

        } else if(absent===0){
            return (<div className={classes.single}>
                <Alert severity="success" className={classes.nodata}>
                  <AlertTitle>All classes attended!</AlertTitle>
                  This student has attended all classes!
              </Alert>
      </div>);

        } else if(present===0){
            return (<div className={classes.single}>
                    <Alert severity="error" className={classes.nodata}>
                        <AlertTitle>No classes attended!</AlertTitle>
                        This student has attended 0 classes — <strong>send alert now!</strong>
                    </Alert>
                    <Button variant="contained" className={classes.send} onClick={sendMessage}>
                        Send Alert
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <MiniAlert onClose={handleClose} severity="success">
                            Notification Sent!
                        </MiniAlert>
                    </Snackbar>
            </div>);

        } else {
            return (<div className={classes.single}>
                      <Alert severity="warning" className={classes.nodata}>
                        <AlertTitle>Insufficient Data</AlertTitle>
                        No student or course selected — <strong>fill info to check</strong>
                    </Alert>
            </div>);
        }
    }

    useEffect(() => {
        getCourses();
    });

    function handleCourse(event) {
        whichCourse(event.target.value);
        const temp = event.target.value;
        // console.log(event.target.value, temp);
        // updateStud(temp.students);

        courseList.map((option) => {
            if(option._id === temp) {
                console.log(option);
                updateStud(option.students);
                updateName(option.courseName);
            } else {
                console.log("Nope!");
            }
        });
    }

    function handleStudent(event) {
        whichStudent(event.target.value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (<div className={classes.base}>
        <div className={classes.block}>
            <div className={classes.heading}>
                <h1>Check Attendance of Students</h1>
            </div>
            <div className={classes.form}>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="outlined-select-course"
                            select
                            label="Select"
                            value={course}
                            onChange={handleCourse}
                            helperText="Please select the course"
                            variant="outlined"
                            >
                            {courseOptions()}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-student"
                            select
                            label="Select"
                            value={student}
                            onChange={handleStudent}
                            helperText="Please select the student"
                            variant="outlined"
                            >
                            {studentOptions()}
                        </TextField>
                    </div>
                </form>
            </div>
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={getRecord}>
                    Get Attendance Data
                </Button>
            </div>
            <div className={classes.alert}>
                {showData()}
            </div>
        </div>
    </div>);
}