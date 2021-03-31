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

axios.defaults.withCredentials = true;

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

    const [courses, newCourses] = useState([{
        _id: 'Not working',
        courseName: 'Not working'
    }]);
    const [whichCourse, updateCourse] = useState();
    const [info, updateInfo] = useState({
        semester: "",
        section: ""
    });
    const [studList, updateList] = useState([]);
    const [middle, changeMiddle] = useState({});
    const [present, updatePresent] = useState([""]);

    function getCourses() {
        axios.get("http://localhost:5000/api/getcourses").then(response => {
            if(response.status === 200) {
                newCourses(response.data);
                // console.log(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    function sendMarks(){

        setOpen(true);
        console.log("This is working");

        axios.post("http://localhost:5000/api/addattend", querystring.stringify({course: whichCourse, semester: info.semester, section: info.section, studentList: present}), {
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

    function studentOptions() {
        if(studList) {
            return (studList.map((student) => <FormControlLabel
                control={<Checkbox checked = {middle[student]} onChange = {handleChange} name = {student} />}
                label={student}
            />));
        } else {
            return "Choose the course.";
        }
    };

    useEffect(() => {
        getCourses();
    });

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
                    changeMiddle({...middle, [student]: false});
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

    const handleChange = (event) => {
        updatePresent([...present, [event.target.name]]);
        middle[event.target.name] = true;
        
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
                    {studentOptions()}
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
