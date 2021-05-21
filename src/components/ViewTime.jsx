import {React, useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    body: {
        background: '#73C8A9',  /* fallback for old browsers */
        background: '-webkit-linear-gradient(to right, #373B44, #73C8A9)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to top, #373B44, #73C8A9)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */        
        backgroundSize: 'cover',
        height:'150vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    image: {
        width: '100%',
        height: '200vh',
        margin: 'auto',
        textAlign: 'center',
        paddingTop: '50px'
    },

    heading: {
        margin: '30px auto 50px auto',
        backgroundColor: 'white',
        padding: '20px 50px',
        transitionDuration: '1s',
        '&:hover': {
            borderRadius: '10%',
            boxShadow: '10px 10px 15px black'
        }

    },

    time: {
        width: '100rem',
        height: '100vh',
        marginBottom: '200px',
        transitionDuration: '1s',
        '&:hover': {
            boxShadow: '10px 10px 15px black'            
        }
    }
});

export default function Calendar() {

    const classes = useStyles();
    const [timeTable, updateTime] = useState();

    function getTime() {

        axios.get("http://localhost:5000/api/viewtime", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                console.log(response.data.timeTable);
                updateTime(response.data.timeTable.data);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    function findTime() {

        console.log(timeTable);
        if(timeTable) {
            return timeTable;
        } else {
            return "";
        }
    }

    useEffect(()=> {
        getTime();
    });

    return (<div className={classes.body}>
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1>Class Time Table</h1>
            </div>
            <div className={classes.image}>
                <img className={classes.time} alt="Class Timetable" src={findTime()}/>
            </div>
        </div>
    </div>);
}