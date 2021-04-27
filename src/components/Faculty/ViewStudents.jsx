import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({

    body: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1495482432709-15807c8b3e2b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80)',
        backgroundSize: 'cover',
        height:'100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    root: {
        '& > *': {
            width: '25ch',
            display: 'flex',
            flexDirection: 'column',
            margin: '50px auto',
        },
    }

});

export default function AllStudents(){

    const classes = useStyles();

    const [courseList, updateList] = useState();
    const [semester, whichSem] = useState();
    const [course, whichCourse] = useState();
    const [studList, updateStud] = useState();

    function getCourse() {

        axios.get("http://localhost:5000/api/getcourses", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateList(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function getStudents() {

        axios.post("http://localhost:5000/api/getstudents", querystring.stringify({semester: semester, course: course}), {
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            credentials: 'include',
            withCredentials: true
        })
        .then(response => {
            if(response.status === 200) {
                updateStud(response.data);
            }
        });
    }

    function semOptions() {
        if(courseList) {
            return (courseList.map((option) => <option key={option.semester} value={option.semester}>
            Semester {option.semester}
          </option>));
        } else {
            return "Oops";
        }
    }

    function courseOptions() {
        if(courseList) {
            return (courseList.map((option) => <option key={option.courseName} value={option.courseName}>
            {option.courseName}
          </option>));
        } else {
            return "Oops";
        }
    }

    function showStudents() {
        if(studList) {

        } else {
            return "No course selected yet";
        }

    }

    function showCourse() {
        if(course) {
            return "Current Course: " + course.courseName;
        } else {
            return "No course selected yet";
        }
    }

    useEffect(() => {
        getCourse();
    });

    function handleSem(event) {
        whichSem(event.target.value);
    }

    function handleCourse(event) {
        whichCourse(event.target.value);
    }

    return (<div className={classes.body}>
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                    id="outlined-select-semester"
                    select
                    label="Select"
                    value={semester}
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
                    Show Students
                </Button>
            </div>
            <div>
                {showCourse()}
            </div>
        </div>
        <div>
            {showStudents()}
        </div>

    </div>);

}