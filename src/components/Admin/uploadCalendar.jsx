import Axios from 'axios';
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import querystring from 'querystring';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Upload(){

    const classes = useStyles();

    const [current, updateCurrent] = useState();
    const [latest, updateLatest] = useState({
        calData: "",
        calContent: "image/png"
    });

    function getCalendar(){
        Axios.get("http://localhost:5000/api/addcalendar", {withCredentials: true}).then(response=>{
            if(response.data === "None") {
                updateCurrent("No calendar to see.");
            } else if(response.data) {
                updateCurrent({
                    data: response.data.data,
                    contentType: response.data.currentType
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function changeCalendar(){
        Axios.post("http://localhost:5000/api/addcalendar", querystring.stringify({calendarData: latest.calData, calendarContent: latest.calContent}),{
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            credentials: 'include',
            withCredentials: true
        }).then(response=> {
            if(response.status === 200) {
                console.log("Success!");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleChange = (prop) => (event) => {
        updateLatest({ ...latest, [prop]: event.target.value });
          // console.log(info);
    };

    useEffect(()=> {
        getCalendar();
    });


    return (<div>
        <h3>Current Calendar:</h3>
        <img alt="Current Calendar" src= "../img"/  >
        <form className={classes.root} noValidate autoComplete="off">
            {/* <Button variant="info">Choose file</Button> */}
            <TextField type="file" accept=".png .jpg .jpeg" id="standard-basic" label="Choose a file" value={latest.calData} onChange={handleChange}/>
            <Button variant="primary" size="lg" onClick={changeCalendar}>
                Upload Calendar
            </Button>
        </form>
    </div>);
}