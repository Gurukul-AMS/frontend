import {React, useEffect, useState} from 'react';
import Axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Attendance from "./Attendance";

const useStyles = makeStyles({
    body: {
        backgroundImage: 'url(https://cdn.wallpapersafari.com/93/1/6peHPd.jpg)',
        backgroundSize: 'cover',
        height:'100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto 50px 100px 50px',
        justifyContent: 'space-between',
        paddingTop: '30px',
        maxWidth: '100%'
    },

    heading: {
        textAlign: 'center',
        paddingTop: '50px',
        fontFamily: "'Monaco', monospace",
        fontSize: '5rem',
        color: '#9ddfd3',
    }
});

export default function ViewMarks() {

    const classes = useStyles();
    const [attendance, setAttend] = useState([]);

    function getMarks(){
        
        Axios.get("http://localhost:5000/api/viewattend", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                setAttend(response.data);
                // console.log(response.data);
            };
        })
        .catch(error => {
            console.log(error);
        });
    };

    function showAttend() {
        if(attendance) {
            return (attendance.map((record) => <Attendance
                course = {record.course}
                date = {record.date}
            />));
        } else {
            return "Oops";
        }
    };

    useEffect(() => {
        getMarks();
    });

    return (<div className={classes.body}>
            <h1 className={classes.heading}>Attendance</h1>
            <div className={classes.root}>
                {showAttend()}
            </div>
    </div>);
};