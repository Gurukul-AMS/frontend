import {React, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import querystring from 'querystring';

const useStyles = makeStyles({

    img  : {
        display: 'block',
        height: '6rem',
        width: '6rem',
        padding: '30px auto',
        margin: 'auto'
    },

    card: {
        display: 'flex',
        backgroundColor: '#02475e',
        margin: '2% 5% 2% 5%',
        padding: '20px auto auto auto',
        color: 'white',
        flex: '0 1 500px',
        height: '200px',
        transitionDuration: '0.5s',
        '&:hover' :{
            boxShadow: '15px 15px 5px #393e46',
            backgroundColor: '#076d8f',
            borderRadius: '5%',
        },
    },

    first: {
        flex: '1',
        borderRight: '1px solid white',
        margin: 'auto',
        height: '100%',
        paddingTop: '10%'
    },

    info: {
        flex: '2',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
    },

    h1: {
        marginTop: '15px',
        fontSize: '25px',
        flex: '2',
        borderBottom: '1px solid white',
    },

    h2: {
        fontSize: '18px',
        flex: '1',
    },

    h4: {
        fontSize: '15px',
        borderBottom: '1px solid white',
    },

    third: {
        flex: '1',
        margin: 'auto',
        height: '100%',
        backgroundColor: '#4b778d',
        borderRadius: 'inherit',
        borderLeft: '1px solid white',
        display: 'flex',
        flexDirection: 'column',
    },

    button: {
        flex: '1',
        margin: 'auto auto auto auto',
        padding: '20px'
    },

    delete: {
        height: '50px',
        width: '100px',
        backgroundColor: '#cf0000',
        color: 'white',
        transitionDuration: '0.5s',
        '&:hover' : {
            backgroundColor: '#da7f8f',
        },
    },

    edit: {
        height: '50px',
        width: '100px',
        backgroundColor: '#206a5d',
        color: 'white',
        transitionDuration: '0.5s',
        '&:hover' : {
            backgroundColor: '#8fd9a8',
        }
    }

});

export default function StudentCard(props) {

    const classes = useStyles();

    function figureOut(){
        if(props.pic){
            // console.log(props.pic.data);

            return "/display_images/"+ props.pic.data;
        }
        else
            return;
    }

    function deleteUser() {
        axios.post("http://localhost:5000/api/allusers", querystring.stringify({action: "Delete", whichUser: props.id}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then(response => {
            if(response.status === 200) {
                window.location = '/admin/viewusers';
            }
        })
    }

    function redirect(){
        window.location = '/admin/updateuser';
    }

    return (<div className={classes.card}>
        <div className={classes.first}>
            <img className={classes.img} alt="DP" src={figureOut()}/>
        </div>
        <div className={classes.info}>
            <h1 className={classes.h1}>{props.name}</h1>
            
            <h4 className={classes.h4}>{props.role}</h4>

            <h2 className={classes.h2}>Username: {props.user}</h2>

            <h2 className={classes.h2}>Email: {props.email}</h2>
        </div>
        <div className={classes.third}>
            <div className={classes.button}>
                <Button className={classes.delete} variant="contained" onClick={deleteUser}>
                    Delete User
                </Button>
            </div>
            <div className={classes.button}>
                <Button className={classes.edit} variant="contained" onClick={redirect}>
                    Edit User
                </Button>
            </div>
        </div>
    </div>);
}