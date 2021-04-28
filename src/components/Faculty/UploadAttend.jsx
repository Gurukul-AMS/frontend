import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import querystring from 'querystring';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    bg: {
        backgroundImage: 'url(https://wallpapercave.com/wp/wp2620466.jpg)',
        backgroundSize: 'cover',
        height:'100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
          display: 'flex',
          flexDirection: 'column',
          margin: '50px auto',
        },
    },

    block: {
        border: '2px solid black',
        width: '35%',
        margin: '50px auto 80px auto',
        paddingBottom: '50px',
        borderRadius: '10%',
        backgroundColor: 'white',
    },

    button: {
        textAlign: 'center',
    },

    heading: {
        textAlign: 'center',
        paddingTop: '50px',
    },
    loop: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },

    checkbox: {
        display: 'flex',
    },

    formControl: {
        margin: theme.spacing(3),
    }

}));

export default function UploadAttend(){

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [courses, newCourses] = useState([]);
    const [whichCourse, updateCourse] = useState();
    const [info, updateInfo] = useState({
        semester: "",
        section: ""
    });
    const [studList, updateList] = useState([]);
    const [middle, changeMiddle] = useState({});
    const [upper, changeUpper] = useState({});
    const [present, updatePresent] = useState([]);
    const [absent, updateAbsent] = useState([]);

    function getCourses() {

        console.log("I mean, come on!");

        axios.get("http://localhost:5000/api/getcourses", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                newCourses(response.data);
                console.log(response);
            } else {
                console.log("Failure");
            }
        })
        .catch(error => {
            console.log(error);
            console.log("Another failure");
        });
    };

    function sendMarks(){

        setOpen(true);
        console.log("This is working");

        axios.post("http://localhost:5000/api/addattend", querystring.stringify({course: whichCourse, semester: info.semester, section: info.section, presentList: present, absentList: absent}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        }).then(response => {
            if(response.status === 200) {
                console.log("Attendance successfully updated");
                window.location = '/faculty/attendance';
            }
        });

    };

    function courseOptions() {
        return courses.map((option) => (
        <MenuItem key={option._id} value={option._id}>
            {option.courseName} - Section {option.section}
        </MenuItem>));
    }

    function presentOptions() {
        getCourses();

        if(studList) {
            return (studList.map((student) => <FormControlLabel
                control={<Checkbox checked = {middle[student]} onChange = {handlePresent} value = {student} />}
                label={student}
            />));
        } else {
            return "Choose the course.";
        }
    };

    function absentOptions() {
        getCourses();

        if(studList) {
            return (studList.map((student) => <FormControlLabel
                control={<Checkbox checked = {upper[student]} onChange = {handleAbsent} value = {student} />}
                label={student}
            />));
        } else {
            return "Choose the course.";
        }
    };

    useEffect(() => {
        getCourses();
    },[]);

    const handleCourse = (event) => {

        updateCourse(event.target.value);
        console.log(event.target.value);

        courses.map((course) => {
            if(course._id === event.target.value) {
                updateInfo({
                    semester: course.semester,
                    section: course.section
                });
                console.log(course);
                updateList(course.students);

                course.students.map((student) => {
                    middle[student] = false;
                });
            }
        });

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    };

    const handlePresent = (event) => {
        updatePresent([...present, event.target.value]);
        console.log(present);
        middle[event.target.value] = !middle[event.target.value];
        
    };

    const handleAbsent = (event) => {
        updateAbsent([...absent, event.target.value]);
        console.log(absent);
        upper[event.target.value] = true;
        
    };

    return (<div className={classes.bg}>
    <div className={classes.block}>
        <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.heading}>
                <h1>Upload Attendance</h1>
            </div>
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
            </div>
        
        </form>
        <div className={classes.checkbox}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Who's here?</FormLabel>
                <FormGroup>
                    {presentOptions()}
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Who isn't here?</FormLabel>
                <FormGroup>
                    {absentOptions()}
                </FormGroup>
            </FormControl>
        </div>
        <div className={classes.loop}>
            <div className={classes.button}>
            <Button variant="contained" color="primary" onClick={sendMarks}>
                Submit
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Attendance Uploaded!
                </Alert>
            </Snackbar>
            </div>
        </div>
        </div>
    </div>);

}
