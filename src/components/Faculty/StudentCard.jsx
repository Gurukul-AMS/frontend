import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    card: {
        display: 'flex',
        backgroundColor: '#907fa4',
        flex: '0 1 600px',
        margin: '2% 5%',
        height: '200px',
        transitionDuration: '0.5s',
        '&:hover' : {
            backgroundColor: '#583d72',
            boxShadow: '10px 10px 5px #999999',
            borderRadius: '5%',
            color: 'white',
        },
    },

    first: {
        flex: '1',
        borderRight: '1px solid white',
        margin: 'auto',
        height: '100%',
        paddingTop: '10%'
    },

    image: {
        display: 'block',
        height: '5rem',
        width: '5rem',
        padding: '30px auto',
        margin: 'auto'
    },

    second: {
        flex: '3',
        display: 'flex',
        flexDirection: 'column',
    },

    bigger: {
        flex: '1',
        margin: '10px auto',
        borderBottom: '1px solid white',
        width: '100%',
        textAlign: 'center'
    },

    smaller: {
        flex: '2',
        textAlign: 'center',
    },

    name: {
        fontSize: '30px',
    },

    h4: {
        fontSize: '20px',
    },

    third: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid white'
    },

    button: {
        flex: '1',
        margin: '10% auto auto auto',
    },

    marks: {
        margin: 'auto 10px',
        backgroundColor: '#7868e6',
        color: 'white',
        transitionDuration: '0.5s',
        '&:hover' : {
            backgroundColor: '#890596'
        }
    },

    attend: {
        margin: 'auto 10px',
        backgroundColor: '#00adb5',
        color: 'white',
        transitionDuration: '0.5s',
        '&:hover' : {
            backgroundColor: '#04009a'
        }
    }
});

export default function StudentCard(props) {

    const classes = useStyles();

    function sendMarks(){
        window.location = '/faculty/marks';
    }

    function sendAttendance(){
        window.location = 'faculty/attendance';
    }

    function isPic(){
        if(props.pic)
            return props.pic.data;
        else
            return ;
    }

    return (<div className={classes.card}>
        <div className={classes.first}>
            <img className={classes.image} alt="DP"src={isPic()}/>
        </div>
        <div className={classes.second}>
            <div className={classes.bigger}>
                <h1 className={classes.name}>{props.name}</h1>
            </div>
            <div className={classes.smaller}>
                <h4 className={classes.h4}>{props.user}</h4>
                <h4 className={classes.h4}>{props.email}</h4>
            </div>
        </div>
        <div className={classes.third}>
            <div className={classes.button}>
                <Button className={classes.marks} onClick={sendMarks} variant="contained">
                    Upload Marks
                </Button>
            </div>
            <div className={classes.button}>
                <Button className={classes.attend} onClick={sendAttendance} variant="contained">
                    Upload Attendance
                </Button>
            </div>
        </div>
    </div>);
}