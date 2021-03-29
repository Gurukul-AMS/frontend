import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

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

export default function Notification(props){

    const classes = useStyles();

    return (<div className={classes.card}>
        <dt className={classes.dt}>
            <span className={classes.action} role="image">
                <img className={classes.action}/>
            </span>
        </dt>
        <h5 className={classes.h5}>From: {props.from}</h5>
        <h4 className={classes.h4}>{props.content}</h4>
    </div>);
};