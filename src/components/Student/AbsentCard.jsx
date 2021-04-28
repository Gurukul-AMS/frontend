import {React, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';

const useStyles = makeStyles({

    card: {
        textAlign: 'center',
        backgroundColor: 'black',
        border: '5px solid white',
        float: 'left',
        margin: '15px',
        height: '200px',
        width: '300px',
        borderRadius: '5%',
        color: 'white',
        boxShadow: '15px 15px 5px black',
    },

    action: {
        color: 'white',
        textAlign: 'center,'
    },

    dt: {
        margin: '25px auto 25px auto',
        fontSize: '1.3em',
        color: '#9ddfd3'
    },

});

export default function Attendance(props){

    const [course, whichCourse] = useState("Loading...");

    function findCourse() {
        
        axios.post("http://localhost:5000/api/mycourse", querystring.stringify({course: props.course}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(response => {
            if(response.status === 200) {
                whichCourse(response.data);
            }
        });
    };

    useEffect(() => {
        findCourse();
    });

    const classes = useStyles();

    return (<div className={classes.card}>
        <dt className={classes.dt}>
            <h3 className={classes.action}>{course}</h3>
        </dt>
        <h5 className={classes.h5}>Date: {props.date}</h5>
    </div>);
};