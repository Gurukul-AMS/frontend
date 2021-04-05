import {React, useState, useEffect} from "react";
import { Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import GroupIcon from '@material-ui/icons/Group';
import InboxIcon from '@material-ui/icons/Inbox';
import InputIcon from '@material-ui/icons/Input';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
}));

export default function Header(props){
  
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
        return "0";
      }
    }

    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    function upperList(){
      
      if(props.currentUser === "Admin") {
        return <List>
        {['Add Class', 'Add Course', 'View Logs', 'Upload Calendar'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index === 0 && <PeopleOutlineIcon/>}</ListItemIcon>
            <ListItemIcon>{index === 1 && <MenuBookIcon/>}</ListItemIcon>
            <ListItemIcon>{index === 2 && <ListAltIcon/>}</ListItemIcon>
            <ListItemIcon>{index === 3 && <CalendarTodayIcon/>}</ListItemIcon>

            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      }

      else if(props.currentUser === "Faculty") {
        return <List>
        {['Edit Profile', 'Upload Attendance', 'Upload Marks', 'View Students'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index === 0 && <AccountBoxIcon/>}</ListItemIcon>
            <ListItemIcon>{index === 1 && <FormatListNumberedIcon/>}</ListItemIcon>
            <ListItemIcon>{index === 2 && <AssignmentTurnedInIcon/>}</ListItemIcon>
            <ListItemIcon>{index === 3 && <GroupIcon/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      } else if (props.currentUser === "Student") {
        return <List>
        {['Edit Profile', 'View Attendance', 'View Marks'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index === 0 && <AccountBoxIcon/>}</ListItemIcon>
            <ListItemIcon>{index === 1 && <FormatListNumberedIcon/>}</ListItemIcon>
            <ListItemIcon>{index === 2 && <AssignmentTurnedInIcon/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      }
    }

    function lowerList() {

      if(props.currentUser === "Admin") {
        return <List>
        {['Notifications', 'View Users'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index  === 0 && <InboxIcon />}</ListItemIcon>
            <ListItemIcon>{index  === 1 && <GroupIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      }

      else if(props.currentUser === "Faculty") {
        return <List>
        {['Notifications'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index  === 0 && <InboxIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      }

      else if(props.currentUser === "Student") {
        return <List>
        {['Notifications', 'Update Class', 'Update Course'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index  === 0 && <InboxIcon />}</ListItemIcon>
            <ListItemIcon>{index  === 1 && <InputIcon />}</ListItemIcon>
            <ListItemIcon>{index  === 2 && <AddBoxIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      }
    }

    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {upperList()}
        <Divider />
        {lowerList()}
      </div>
    );


    useEffect(() => {
      howManyNotifs();
    });

    var check = (props.showThis === "LOGGED_IN") ? true : false;
    var link2;
    var show2;
    if(check)
    {
      link2 = "/logout";
      show2 = "Logout";
    }
    else
    {
      link2 = "/login";
      show2 = "Login";
    }

    const classes = useStyles();

    function hereDrawer() {
      if(props.showThis === "NOT_LOGGED_IN") {
        return <Nav><Nav.Link href="/signup">Sign Up</Nav.Link></Nav>
      } else {
        return (<div>
          <Button onClick={toggleDrawer('right', true)}>{props.currentUser}</Button>
          <SwipeableDrawer
            anchor= 'right'
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </div>);
      }

    }

    return <Navbar collapseOnSelect variant="dark" expand="lg">
      <Navbar.Brand href="/">Gurukul</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
          <Nav.Link href="/calendar">Calendar</Nav.Link>
          <Nav.Link href="compose">Time Table</Nav.Link>
          <Nav.Link href={"/profile/"+ props.currentUser.role}>Profile</Nav.Link>
      </Nav>
      {hereDrawer()}
      <Nav>
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
    </Navbar>;

  };