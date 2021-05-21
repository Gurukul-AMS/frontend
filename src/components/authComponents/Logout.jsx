import {React, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles({

  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height:'100vh',
    maxWidth: '90%',
    overflow: 'hidden',
    objectFit: 'fill',
    margin: 'auto auto 50px auto'
  },


});

export default function Logout(){

    const classes = useStyles();

    function userLogout(){
        axios.get("http://localhost:5000/api/logout", {withCredentials: true}).then(response => {
          if(response.status === 200){
                console.log("Logged out");
          } else if(response.status !== 200) {
                console.log("Not logged out.");
          }
        })
        .catch(error => {
          console.log("There is an error in logging out", error);
        });
      };
    
    useEffect(() => {
        userLogout();
    });

    return <div className={classes.root} style={{backgroundImage: 'url(background/logout.jpg)'}}>
    </div>
}
