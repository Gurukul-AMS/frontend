import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import StudentCard from './StudentCard';

const useStyles = makeStyles((theme) => ({

    body: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1495482432709-15807c8b3e2b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80)',
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
        },
    },

    block: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: '5%',
        margin: '30px auto auto auto',
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
        textAlign: 'center',
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