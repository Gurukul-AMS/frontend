import React from 'react';
import './logStyle.css';

export default function Log(props){

  var source;
  var alt = props.action;

  if(alt === "Registered")
  {
    source = "../img/register.png";
  }  else if(alt === "Logged In") {
    source = "../img/login.png";
  } else if(alt === "Viewed Profile") {
    source = "../img/image.png";
  } else if (alt === "Viewed Academic Calendar") {
    source = "../img/calendar.png";
  }

  return (<div className="card">
     <dt>
      <span className="action" role="img">
        <img className="action" alt={alt} src = {source}/>
      </span>
    </dt>
    <h5>Date: {props.date}</h5>
    <h5>Time: {props.time}</h5>
    <h4>Action: {props.action}</h4>
    <h4>User: {props.user}</h4>

  </div>);

};