import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Axios from 'axios';
import querystring from 'querystring';

const useStyles = makeStyles({

    card: {
        textAlign: 'center',
        backgroundColor: '#440a67',
        border: '5px solid white',
        float: 'left',
        margin: '15px',
        height: '300px',
        width: '800px',
        borderRadius: '5%',
        color: 'white'
    },

    action: {
        width: '5rem',
        height: '5rem',
        margin: '20px auto',
        display: 'block',
    },

    dt: {
        margin: '5px auto 5px auto',
        fontSize: '1.3em',
        color: '#9ddfd3'
    },

});

export default function Marks(props){

    const [course, whichCourse] = useState("Loading...");

    function findCourse() {
        
        Axios.post("http://localhost:5000/api/mycourse", querystring.stringify({course: props.course_id}), {
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
            <span className={classes.action}>
                <h3>{props.comp}</h3>
            </span>
        </dt>
        <h5 className={classes.h5}>Course: {course}</h5>
        <h4 className={classes.h4}>{props.score}</h4>
    </div>);
};