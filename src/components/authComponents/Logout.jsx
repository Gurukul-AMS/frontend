import {React, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Logout(){

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

    return <div>
        <h2>You have logged out. </h2>

    </div>
}

export default Logout;