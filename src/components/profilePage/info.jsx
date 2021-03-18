import React from 'react';

export default function Info(props){

  return (<div className="overall">
    <div className="profilePic">
      <img className="pic" alt="User" src="./image.png"/>
    </div>
    <div className="username">
      <div>
          <h3>Username</h3>
      </div>
      <div>
          <h3>{props.currentUser.username}</h3>
      </div>
    </div>
    <div>

    </div>
  </div>);
};