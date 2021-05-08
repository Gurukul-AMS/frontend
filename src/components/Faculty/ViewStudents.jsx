import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import StudentCard from './StudentCard';

const useStyles = makeStyles((theme) => ({

    'body' : {
        height: '100vh',
    },

    body: {
        background: '#00416A',  /* fallback for old browsers */
        background: '-webkit-linear-gradient(to right, #E4E5E6, #00416A)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to bottom, #E4E5E6, #00416A)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */        
        height:'100%',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

    block: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: '5%',
        margin: '30px auto 100px auto',
    },

    heading: {
        textAlign: 'center',
        paddingTop: '30px'
    },

    intricacy: {
        margin: '40px 40px auto 40px',
        textAlign: 'center',
    },

    button: {
        textAlign: 'center',
    },

    list: {
        display: 'flex',
        flexDirection: 'column',
    },

    course: {
        textAlign: 'center',
        margin: '20px auto 20px auto',

    },

    students: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        float: 'left'
    }


}));

export default function AllStudents(){

    const classes = useStyles();

    const [courseList, updateCourse] = useState([]);
    const [sem, whichSem] = useState("");
    const [course, whichCourse] = useState("");
    const [studList, updateStud] = useState([]);

    function getCourses() {

        axios.get("http://localhost:5000/api/getcourses", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateCourse(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function getStudents() {

        axios.post("http://localhost:5000/api/getstudents", querystring.stringify({semester: sem, course: course}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              credentials: 'include',
              withCredentials: true
        })
        .then(response => {
            if(response.status === 200) {
                updateStud(response.data);
                console.log(response.data);
            }
        });
    }

    function semOptions() {
        if(courseList) {
            return (courseList.map((option) => <MenuItem label={option.semester} value={option.semester}> 
                Semester {option.semester}
            </MenuItem>));
        } else {
            return "Yikes";
        }
    }

    function courseOptions() {
        if(courseList) {
            return (courseList.map((option) => <MenuItem label={option.courseName} value={option.courseName}>
                {option.courseName}
            </MenuItem>));
        } else {
            return "Oops";
        }
    }

    function courseTitle() {
        if(course) {
            return course;
        } else {
            return "No course selected yet";
        }
    }

    function showStudents() {
        if(studList) {
            return (studList.map((stud) => <StudentCard
                pic={stud.profilePic}
                user={stud.username}
                name={stud.firstName + ' ' + stud.lastName}
                email={stud.email}
            />));
        } else {
            return "No students selected yet";
        }
    }

    useEffect(() => {
        getCourses();
    });

    function handleSem(event) {
        whichSem(event.target.value);
    }

    function handleCourse(event) {
        whichCourse(event.target.value);
    }

    return (<div className={classes.body}>
        <div className={classes.block}>
            <div className={classes.heading}>
                <h1>Select Course:</h1>
            </div>
            <div className={classes.intricacy}>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                        id="outlined-select-sem"
                        select
                        label="Select"
                        value={sem}
                        onChange={handleSem}
                        helperText="Please select the semester"
                        variant="outlined"
                        >
                        {semOptions()}
                        </TextField>
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
                </form>
                <div className={classes.button}>
                    <Button variant="contained" color="primary" onClick={getStudents}>
                        View Students
                    </Button>
                </div>
            </div>
            <div className={classes.list}>
                <div className={classes.course}>
                    <h5>{courseTitle()}</h5>
                </div>
                <div className={classes.students}>
                    {showStudents()}
                </div>
            </div>
        </div>
    </div>);
}