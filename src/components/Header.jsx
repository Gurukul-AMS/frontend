import {React, useState, useEffect} from "react";
import { Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

function Header(props){

    const [number, updateNum] = useState(0);

    function howManyNotifs() {
      axios.get("http://localhost:5000/api/notifs", {withCredentials: true}).then(response => {
        if(response.status === 200) {
          updateNum(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
    };

    function setNumber() {
      if(props.showThis === "LOGGED_IN") {
        return number.length;
      } else {
        return 0;
      }
    }

    useEffect(() => {
      howManyNotifs();
    });

    var check = (props.showThis === "LOGGED_IN") ? true : false;
    var link1;
    var link2;
    var show1;
    var show2;
    if(check)
    {
      link1 = "/drawer";
      show1 = props.currentUser.role;
      link2 = "/logout";
      show2 = "Logout";
    }
    else
    {
      link1 = "/signup";
      show1 = "Sign Up";
      link2 = "/login";
      show2 = "Login";
    }

    const classes = useStyles();

    return <Navbar collapseOnSelect variant="dark" expand="lg">
    <Navbar.Brand href="/">Gurukul</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
        <Nav.Link href="/calendar">Calendar</Nav.Link>
        <Nav.Link href="compose">Time Table</Nav.Link>
        <Nav.Link href={"/profile/"+ props.currentUser.role}>Profile</Nav.Link>
    </Nav>
    <Nav>
        <Nav.Link href={link1}>{show1}</Nav.Link>
        <Nav.Link href={link2}>{show2}</Nav.Link>
    </Nav>
    <Nav>
        <div className={classes.root}>
            <a href="/notifs">
              <Badge badgeContent = {setNumber()} color="primary">
                <Avatar alt={props.currentUser.username} src="" />
              </Badge>
            </a>
        </div>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
};

export default Header;