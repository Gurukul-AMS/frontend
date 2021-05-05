import {React, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import querystring from "querystring";
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({

    card: {
        backgroundColor: '#323232',
        borderRadius: '2%',
        margin: '5px 30px 5px 30px',
        height: '100%',
        width: '90%',
        color: '#ffffff'
    },

    action: {
        width: '5rem',
        height: '5rem',
        marginLeft: '20px',
        marginBottom: '2%',
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
    },
    check: {
        backgroundColor: '#687980',
        display: 'flex',
        width: '100%',
    },

    box: {
        marginLeft: 'auto',
    },

    info: {
        margin: '10px',
        textAlign: 'right',
        flexGrow: '1',
    }

});

export default function Notification(props){

    const classes = useStyles();

    const [checked, changeCheck] = useState(false);

    function sendBack(){
        axios.post("http://localhost:5000/api/notifs", querystring.stringify({notif: props.id}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then(response => {
            if(response.status === 200){
                console.log("Notification seen!");
                window.location = '/notifs';
            }
        });
    }

    function handleChange(event) {
        changeCheck(!checked);

        sendBack();
    }

    function shouldCheck(){
        if(props.show == "Unseen") {
            return (<div className={classes.check}>
                <h6 className={classes.info}>Click here to remove this notification</h6>
            <Checkbox
                className={classes.box}
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            </div>);
        }
    }

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
        {shouldCheck()}
    </div>);
};