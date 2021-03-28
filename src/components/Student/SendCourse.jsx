import {React, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import querystring from 'querystring';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

export default function SendCourse() {

    const classes = useStyles();

    const [courses, changeCourses] = useState(["Nothing much", "Happens here"]);
    const [whichCourse, thisCourse] = useState("None");

    function getCourses() {
        Axios.get("http://localhost:5000/api/sendcourse", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                changeCourses(response.data);
                console.log(courses);
                console.log("Bruh");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendInfo() {
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
    }

    return (<form className={classes.root} noValidate autoComplete="off">
         <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={whichCourse}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="outlined"
        >
          {courseOptions()}
        </TextField>
        </div>

    </form>);

};

