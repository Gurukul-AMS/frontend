import React, { useEffect } from 'react';
import Log from './Log';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './logStyle.css';

function ViewLog(props) {
    
    var logs = [];

    function getData(){
    
      axios.get("http://localhost:5000/api/logs", {withCredentials: true}).then(response => {
          if(response.status === 200){
              logs = response.data;
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
    });



      return <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Time</th>
          <th>Action</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => <tr>
          <td>{log.date}</td>
          <td>{log.time}</td>
          <td>{log.action}</td>
          <td>{log.actor}</td>
        </tr>)}
      </tbody>
    </Table>
}

export default ViewLog;