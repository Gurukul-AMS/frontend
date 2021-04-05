import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({

    card: {
        backgroundColor: '#323232',
        borderRadius: '2%',
        margin: '5px 30px 5px 30px',
        height: '150px',
        width: '90%',
        color: '#ffffff'
    },

    action: {
        width: '5rem',
        height: '5rem',
        marginLeft: '20px',
        marginTop: '2%',
        display: 'block',
        float: 'left',
    },

    dt: {
        margin: '5px auto 5px auto',
        fontSize: '1.3em',
        color: '#9ddfd3'
    },

    h5: {
        marginLeft: '10%',
        marginTop: '3%'
    },
    h4: {
        marginLeft: '10%',
    }

});

export default function Notification(props){

    const classes = useStyles();

    return (<div className={classes.card}>
        <dt className={classes.dt}>
            <span className={classes.action} role="image">
                <img className={classes.action}/>
            </span>
        </dt>
        <div>
        <p className={classes.h5}>From: {props.from}</p>
        </div>
        <p className={classes.h4}>{props.content}</p>
    </div>);
};