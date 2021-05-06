import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({

    'body' : {
        height: '100%',
    },

    body: {
        height:'100%',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
        backgroundSize: 'cover'

    },

    block: {
        backgroundColor: '#d8e3e7',
        width: '80%',
        margin: '50px auto 100px auto',
    },

    heading: {
        textAlign: 'center',
        paddingTop: '30px',
        paddingBottom: '30px'
    },

    list: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },

    course: {
        textAlign: 'center',
        margin: '20px auto 20px auto',

    },

    students: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        float: 'left'
    }


}));

export default function AllStudents(){

    const classes = useStyles();

    const [userList, updateList] = useState([]);

    function getUsers() {

        axios.get("http://localhost:5000/api/allusers", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateList(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function showUsers() {
        if(userList) {
            return (userList.map((user) => <UserCard
                id={user._id}
                pic={user.profilePic}
                user={user.username}
                role={user.role}
                name={user.firstName + ' ' + user.lastName}
                email={user.email}
            />));
        } else {
            return "No students selected yet";
        }
    }

    useEffect(() => {
        getUsers();
    });

    return (<div className={classes.body}>
        <div className={classes.block}>
            <div className={classes.heading}>
                <h1>All Users</h1>
            </div>
            <div className={classes.list}>
                <div className={classes.students}>
                    {showUsers()}
                </div>
            </div>
        </div>
    </div>);
}