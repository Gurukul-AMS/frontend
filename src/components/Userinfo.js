import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import './user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from "./EditInfo";

function Userinfo(){

    const [info, changeInfo] = React.useState({
        name: "",
        email: "",
        about: "",
        dp: ""
    });

    const [social, changeSocial] = React.useState({
        github: "",
        twitter: "",
        fb: "",
        insta: "",
        linkedin: ""
    });

    return <div className="info">
        <container>
        <Row>
            <Col xs={5} md={3}>
                <Image className="dp" src={info.dp} rounded fluid/>
            </Col>
            <Col xs={5} md={3}>
            <div class="title1">
                <h2>Name</h2>
                <h6>{info.name}</h6>
            </div>
            </Col>
            <Col xs={5} md={3}>
            <div className="title1">
                <h2>Email</h2>
                <h6>{info.email}</h6>
            </div>
            </Col>
            <Col xs={5} md={3}>
                <Edit genInfo={info} socialInfo={social}/>
            </Col>
        </Row>
        <Row>
            <Col xs={5} md={3}>
                <a href={social.github}><i class="fab fa-github fa-3x icon"></i></a>
                <a href={social.fb}><i class="fab fa-facebook-square fa-3x icon"></i></a>
                <a href={social.twitter}><i class="fab fa-twitter-square fa-3x icon"></i></a>
                <a href={social.linkedin}><i class="fab fa-linkedin fa-3x icon"></i></a>
                <a href={social.insta}><i class="fab fa-instagram fa-3x icon"></i></a>
            </Col>
            <Col xs={5} md={3}>
            <div className="title2">
                <h2>About</h2>
                <h6>{info.about}</h6>
            </div>
            </Col>
        </Row>
        </container>
    </div>
}

export default Userinfo;