import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import querystring from 'querystring';
import axios from 'axios';

const useStyles = makeStyles({

});


export default function AllUsers(){

    const classes = useStyles();

    const [action, newAction] = useState();
    const [select, changeSelect] = useState();
    const [users, updateUsers] = useState();

    function getUsers() {
        axios.get("http://localhost:5000/api/allusers", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateUsers(users);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function deleteUser() {
        axios.post("http://localhost:5000/api/allusers", querystring.stringify({action: action, whichUser: select}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            credentials: 'include',
            withCredentials: true
        }).then(function(response){
            if(response.status === 200) {
                console.log("User deleted.");
            }
        });
    }

    useEffect(() => {
        getUsers();
    });


    return (<div>
    <h1>All Users</h1>

    {users.map((user) => <div>


    </div>)}
    
    
    </div>);

}