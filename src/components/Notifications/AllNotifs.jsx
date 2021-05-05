import {React, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Notification from './Notification';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

    body: {
        backgroundColor: '#a3d2ca',
        backgroundSize: 'cover',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
        height: '300rem'
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: '30px',
        margin: 'auto 50px 100px 50px',
        fontFamily: "'Archivo Narrow', sans-serif", 
        fontSize: '1.2em',
        maxWidth: '100%'
    },

    heading: {
        padding: '50px auto 50px auto',
        margin: '50px auto 50px auto',
        textAlign: 'center',
        fontSize: '5rem',
        fontFamily: "'Monaco', monospace",
    },

    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
        textAlign: 'center',
    },

    button: {
        color: 'white',
        backgroundColor: 'green',
        '&:hover': {
            backgroundColor: '#206a5d'
        },
    },

}));

export default function ViewNotifs(){

    const classes = useStyles();

    const [notifs, updateNotifs] = useState([{}]);

    function getNotifs(){
        axios.get("http://localhost:5000/api/notifs/all", {withCredentials: true}).then(response=>{
            if(response.status === 200) {
                var reverse = response.data.reverse();
                updateNotifs(reverse);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    function showNotifs(){
        if(notifs) {
            // console.log(notifs);
            return (notifs.map((notif) => <Notification
                show = "All"
                id = {notif._id}
                from = {notif.from}
                content = {notif.content}
            />));
        } else {
            return "Whoops, sorry!";
        }
    }

    useEffect(() => {
        getNotifs();
    });

    function showAll(){
        window.location = '/notifs';
    }

    return(<div className={classes.body}>
        <div className={classes.heading}> Notifications </div>
        <div className={classes.root}>
            <Button variant="contained" onClick={showAll} className={classes.button}>View Unseen</Button>
        </div>
        <d1 className={classes.container}>
            {showNotifs()}
        </d1>       
    </div>);
}