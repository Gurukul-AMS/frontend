import {React, useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    body: {
        background: '#9D50BB',  /* fallback for old browsers */
        background: '-webkit-linear-gradient(to right, #6E48AA, #9D50BB)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to right, #6E48AA, #9D50BB)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        backgroundSize: 'cover',
        height:'100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },

    image: {
        width: '50%',
        height: '50%',
        margin: '50px auto 50px auto',
    },

    heading: {
        margin: '30px auto 50px auto',

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

        // console.log(calendar);
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
                <img alt="Class Timetable" src={findTime()}/>
            </div>
        </div>
    </div>);
}