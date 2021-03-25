import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import querystring from 'querystring';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const comp = [
    {
        value: 'C1',
        label: 'C1',
    },
    {
        value: 'C2',
        label: 'C2',
    },
    {
        value: 'C3',
        label: 'C3',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    }
}));

export default function UploadMarks(){

    const classes = useStyles();

    const [courses, newCourses] = useState([{
        _id: 'Not working',
        courseName: 'Not working'
    }]);
    const [whichCourse, updateCourse] = useState();
    const [info, updateInfo] = useState({
        semester: "",
        section: ""
    });
    const [whichComp, updateComp] = useState("");
    const [studList, updateList] = useState(["Not working", "This is a mistake"]);
    const [record, updateRecord] = useState({
        studentId: "Temporary",
        studentMarks: ""
    });

    function getCourses() {
        axios.get("http://localhost:5000/api/addmarks", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                newCourses(response.data);
                // console.log(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendMarks(){
        axios.post("http://localhost:5000/api/addmarks", querystring.stringify({component: whichComp, course: whichCourse, semester: info.semester, section: info.section, student: record.studentId, cg: record.studentMarks}), {
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
        return courses.map((option) => (
        <MenuItem key={option._id} value={option._id}>
            {option.courseName} - Section {option.section}
        </MenuItem>));
    }

    function studentOptions() {
        
        if(studList)
            return studList.map((student) => (
                <MenuItem key={student} value={student}>
                    {student}
                </MenuItem>
            ));
        else
            return "Loading...";
    }

    function setRange() {
        if(whichComp === "C1" || whichComp === "C2")
            return 30;
        else if(whichComp === "C3")
            return 40;
        else
            return 0;
    }

    useEffect(() => {
        getCourses();
    })

    const handleComp = (event) => {
        updateComp(event.target.value);
    };

    const handleCourse = (event) => {
        updateCourse(event.target.value);
        console.log(event.target.value);

        courses.map((course) => {
            if(course._id === event.target.value) {
                updateList(course.students);
                updateInfo({
                    semester: course.semester,
                    section: course.section
                });
            }
        });

        console.log(studList);
    };

    const handleRecord = (prop) => (event) => {
        updateRecord({ ...record, [prop]: event.target.value });
          // console.log(info);
    };   

    return (<div>
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                id="outlined-select-component"
                select
                label="Select"
                value={whichComp}
                onChange={handleComp}
                helperText="Please select the component"
                variant="outlined"
                >
                {comp.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>
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
                value={record.studentId}
                onChange={handleRecord('studentId')}
                helperText="Please select the student"
                variant="outlined"
                >
                {studentOptions()}
                </TextField>
                <TextField
                    id="outlined-number"
                    label="Marks"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps = {{
                        step: 0.5,
                        min: 0,
                        max: setRange()
                    }}
                    variant="outlined"
                    value = {record.studentMarks}
                    onChange={handleRecord('studentMarks')}
                />
            </div>
            
            <Button variant="contained" color="primary" onClick={sendMarks}>
                Submit
            </Button>
        </form>
    </div>);

}
