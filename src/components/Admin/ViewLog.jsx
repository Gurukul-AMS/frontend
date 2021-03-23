import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Log from './Log';
import NotAuth from "./notAuth";
import Logout from "../authComponents/Logout";
import './logStyle.css';

function ViewLog(props) {
    
    const [logs, changeLog] = useState([]);
    
    function getData(){
      axios.get("http://localhost:5000/api/logs", {withCredentials: true}).then(response => {
        if(response.status === 200){
            changeLog(response.data);
        } else if(response.status !== 200) {
            console.log(response);
        }
      })
      .catch(error => {
        console.log("There is an error in viewing logs", error);
      });
    }
    

    useEffect(() => {
      getData();
      // console.log(logs);
    });

    if(props.loggedInStatues === "NOT_LOGGED_IN")
      return <Logout/>
    else if(props.currentUser.role !== "Admin")
      return <NotAuth/>

    else
   
    { return (<div>
        <d1 className = "logs">
          {logs.map((log) => <Log
            date = {log.date}
            time = {log.time}
            action = {log.action}
            user = {log.actor}
          />)}
        </d1>
      </div>);
    }

}

export default ViewLog;