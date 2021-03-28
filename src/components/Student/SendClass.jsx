import {React, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import querystring from 'querystring';
import Button from "@material-ui/core/Button";

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

    const [allClasses, changeClasses] = useState(["Nothing much", "Happens here"]);
    const [whichClass, thisClass] = useState("None");

    function getClasses() {
        Axios.get("http://localhost:5000/api/sendclass", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                changeClasses(response.data);
                // console.log(allClasses);
                // console.log("Bruh");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendInfo() {
        Axios.post("http://localhost:5000/api/sendclass", querystring.stringify({class: whichClass}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        }).then(response => {
            if(response.status === 200) {
                console.log("Marks successfully updated");
            }
        });
    };

    function classOptions() {
        return (allClasses.map((option) => <MenuItem key={option._id} value={option._id}>
        Semester {option.semester} - Section {option.section}
      </MenuItem>));
    };

    useEffect(() => {
        getClasses();
    });

    const handleChange = (event) => {
        thisClass(event.target.value);
    }

    return (<form className={classes.root} noValidate autoComplete="off">
         <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={whichClass}
          onChange={handleChange}
          helperText="Please select your class"
          variant="outlined"
        >
          {classOptions()}
        </TextField>
        </div>
        <Button variant="contained" color="primary" onClick={sendInfo}>
            Send
        </Button>

    </form>);

};

