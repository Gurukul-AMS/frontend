import {React, useEffect, useState} from 'react';
import Axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import PresentCard from "./PresentCard";
import AbsentCard from "./AbsentCard";

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
    const [present, setPresent] = useState([]);
    const [absent, setAbsent] = useState([]);

    function getAttend(){
        
        Axios.get("http://localhost:5000/api/viewpresent", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                setPresent(response.data);
                // console.log(response.data);
            };
        })
        .catch(error => {
            console.log(error);
        });

        Axios.get("http://localhost:5000/api/viewabsent", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                setAbsent(response.data);
                // console.log(response.data);
            }
        })
    };

    function showPresent() {
        if(present) {
            return (present.map((record) => <PresentCard
                course = {record.course}
                date = {record.date}
            />));
        } else {
            return "Oops";
        }
    };

    function showAbsent() {
        if(absent) {
            return (absent.map((record) => <AbsentCard
                course = {record.course}
                date = {record.date}
            />));
        } else {
            return "Oops";
        }
    }

    useEffect(() => {
        getAttend();
    });

    return (<div className={classes.body}>
            <h1 className={classes.heading}>Attendance</h1>
            <div className={classes.root}>
                {showPresent()}
            </div>
            <div className={classes.root}>
                {showAbsent()}
            </div>
    </div>);
};