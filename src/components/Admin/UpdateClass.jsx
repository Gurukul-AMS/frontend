import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
        backgroundImage: 'url(https://wallpaperaccess.com/full/284607.jpg)',
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

    const [classList, updateList] = useState([]);
    const [whichClass, updateClass] = useState();
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

    function getClasses() {

        axios.get("http://localhost:5000/api/getclasses", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateList(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendStudent() {

        axios.post("http://localhost:5000/api/class", querystring.stringify({student: whichStudent, class: whichClass}), {
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

    function classOptions() {
        if(classList) {
            return classList.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                    Semester {option.semester} - Section {option.section} 
                </MenuItem>));
        } else {
            return "Sorry";
        }
    }

    function studentOptions() {
        if(studList) {
            return studList.map((stud) => (        
            <MenuItem key={stud._id} value={stud._id}>
                {stud.username}
            </MenuItem>));
        } else {
            return "Error";
        }
    }

    useEffect(() => {
        getStudents();
        getClasses();
    });

    const handleStudent = (event) => {
        thisStudent(event.target.value);
    }

    const handleClass = (event) => {
        updateClass(event.target.value);
    }

    return (<div className={classes.body}>
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1>Update Class</h1>
            </div>
            <form className={classes.form} noValidate autoComplete="off">
                <div>
                    <TextField
                    id="outlined-select-class"
                    select
                    label="Select"
                    value={whichClass}
                    onChange={handleClass}
                    helperText="Please select the class"
                    variant="outlined"
                    >
                    {classOptions()}
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
                    Update Class
                </Button>
            </div>
        </div>
    </div>)
}