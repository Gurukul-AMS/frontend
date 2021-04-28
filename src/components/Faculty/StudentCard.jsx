import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({

    card: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '2%',
        backgroundColor: '#02475e',
        width: '25%',
        margin: '2% 5% 2% 5%',
        padding: '20px auto auto auto',
        boxShadow: '10px 10px 5px #393e46',
        color: 'white'
    },

    img: {
        display: 'flex',
        margin: '5px auto 10px auto',
    },

    title: {
        textAlign: 'center',
    },

    h2: {
        fontSize: '25px'
    },

    h4: {
        fontSize: '20px'
    }

});

export default function StudentCard(props) {

    const classes = useStyles();

    return (<div className={classes.card}>
        <div className={classes.img}>
            <span>
                <img alt={props.username} src={props.pic}/>
            </span>
        </div>
        <div className={classes.title}>
            <h2 className={classes.h2}>{props.user}</h2>
            <h4 className={classes.h4}>{props.name}</h4>
            <h4 className={classes.h4}>{props.email}</h4>
        </div>
    </div>);
}