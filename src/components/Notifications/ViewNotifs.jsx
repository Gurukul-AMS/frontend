import {React, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Notification from './Notification';
import axios from 'axios';

const useStyles = makeStyles({

    body: {
        backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0285/1316/products/w0106_1s_Blue-Watercolor-Pattern-Wallpaper-for-Walls-Outside-the-Lines_Repeating-Pattern-Sample-1.jpg?v=1604087907)',
        backgroundSize: 'cover',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
        height: '200vh'
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

});

export default function ViewNotifs(){

    const classes = useStyles();

    const [notifs, updateNotifs] = useState([{}]);

    function getNotifs(){
        axios.get("http://localhost:5000/api/notifs", {withCredentials: true}).then(response=>{
            if(response.status === 200) {
                updateNotifs(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    function showNotifs(){
        if(notifs) {
            return (notifs.map((notif) => <Notification
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

    return(<div className={classes.body}>
        <div className={classes.heading}> Notifications </div>
        <d1 className={classes.container}>
            {showNotifs()}
        </d1>       
    </div>);
}