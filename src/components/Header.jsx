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
import EditIcon from '@material-ui/icons/Edit';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UpdateIcon from '@material-ui/icons/Update';
import { FileCopy } from "@material-ui/icons";
import AnnouncementIcon from '@material-ui/icons/Announcement';

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
    button: {
      color: 'white',
    }
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

    function upperIcon(index) {
      if(props.currentUser === "Admin") {
        if(index === 0) {
          return <PeopleOutlineIcon/>;
        } else if(index === 1){
          return <MenuBookIcon/>;
        } else if(index === 2){
          return <EditIcon/>;
        } else if(index === 3){
          return <CalendarTodayIcon/>;
        } else if(index === 4){
          return <NoteAddIcon/>;
        } else if(index === 5) {
          return <PostAddIcon/>;
        } else if(index === 6) {
          return <UpdateIcon/>;
        }
      } else if(props.currentUser === "Faculty") {
        if(index === 0) {
          return <AccountBoxIcon/>;
        } else if(index === 1){
          return <FormatListNumberedIcon/>;
        } else if(index === 2){
          return <AssignmentTurnedInIcon/>;
        } else if(index === 3){
          return <AddAPhotoIcon/>;
        } else if(index === 4) {
          return <EditIcon/>;
        }
      } else if(props.currentUser === "Student") {
        if(index === 0) {
          return <AccountBoxIcon/>;
        } else if(index === 1){
          return <InputIcon/>;
        } else if(index === 2){
          return <AddBoxIcon/>;
        } else if(index === 3){
          return <AddAPhotoIcon/>;
        } else if(index === 4){
          return <FileCopy/>;
        } else if(index === 5){
          return <EditIcon/>;
        }
      }
    }

    function upperLink(index){
      if(props.currentUser === "Admin") {
        if(index === 0) {
          return "/admin/class";
        } else if(index === 1) {
          return "/admin/course";
        } else if(index === 2) {
          return "/sendnotif";
        } else if(index === 3) {
          return "/admin/calendar";
        } else if(index === 4) {
          return "/admin/updateclass";
        } else if(index === 5) {
          return "/admin/updatecourse";
        } else if(index === 6) {
          return "/admin/updateuser";
        }
      } else if(props.currentUser === "Faculty") {
        if(index === 0) {
          return "/faculty/edit";
        } else if(index === 1) {
          return "/faculty/attendance";
        } else if(index === 2) {
          return "/faculty/marks";
        } else if(index === 3) {
          return "/updatepic";
        } else if(index === 4) {
          return "/sendnotif";
        }
      } else if(props.currentUser === "Student") {
        if(index === 0) {
          return "/student/edit";
        } else if(index === 1) {
          return "/student/class";
        } else if(index === 2) {
          return "/student/course";
        } else if(index === 3) {
          return "/updatepic";
        } else if(index === 4) {
          return "/student/thesis";
        } else if(index === 5) {
          return "/sendnotif";
        }
      }
    }

    function upperList(){
      
      if(props.currentUser === "Admin") {
        return <List>
        {['Add Class', 'Add Course', 'Send Notification', 'Upload Calendar', 'Update Class', 'Update Course', 'Update User'].map((text, index) => (
          <ListItem button key={text}>
            <a href={upperLink(index)}>
            <ListItemIcon>{upperIcon(index)}</ListItemIcon>
            <ListItemText primary={text} />
            </a>
          </ListItem>
        ))}
      </List>
      }

      else if(props.currentUser === "Faculty") {
        return <List>
        {['Edit Profile', 'Upload Attendance', 'Upload Marks', 'Upload Profile Picture', 'Send Notifications'].map((text, index) => (
          <ListItem button key={text}>
            <a href={upperLink(index)}>
            <ListItemIcon>{upperIcon(index)}</ListItemIcon>
            <ListItemText primary={text} />
            </a>
          </ListItem>
        ))}
      </List>

      } else if (props.currentUser === "Student") {
        return <List>
        {['Edit Profile', 'Update Class', 'Update Course', 'Upload Profile Picture', 'Submit Thesis', 'Send Notifications'].map((text, index) => (
          <ListItem button key={text}>
            <a href={upperLink(index)}>
            <ListItemIcon>{upperIcon(index)}</ListItemIcon>
            <ListItemText primary={text} />
            </a>
          </ListItem>
        ))}
      </List>
      }
    }
    
    function lowerIcon(index) {
      if(props.currentUser === "Admin") {
        if(index === 0) {
          return <InboxIcon/>;
        } else if(index === 1){
          return <GroupIcon/>;
        } else if(index === 2){
          return <ListAltIcon/>;
        } else if(index === 3) {
          return <AnnouncementIcon/>;
        }
      } else if(props.currentUser === "Faculty") {
        if(index === 0) {
          return <InboxIcon/>;
        } else if(index === 1) {
          return <GroupIcon/>;
        }
      } else if(props.currentUser === "Student") {
        if(index === 0) {
          return <InboxIcon/>;
        } else if(index === 1){
          return <FormatListNumberedIcon/>;
        } else if(index === 2){
          return <AssignmentTurnedInIcon/>;
        } 
      }
    }

    function lowerLink(index) {
      
      if(props.currentUser === "Admin") {
        if(index === 0) {
          return "/notifs";
        } else if(index === 1) {
          return "/admin/viewusers";
        } else if(index === 2) {
          return "/admin/logs";
        } else if(index === 3) {
          return "/admin/sendalert";
        }
      } else if(props.currentUser === "Faculty") {
        if(index === 0) {
          return "/notifs";
        } else if(index === 1) {
          return "/faculty/viewstudents";
        }
      } else if(props.currentUser === "Student") {
        if(index === 0) {
          return "/notifs";
        } else if(index === 1) {
          return "/student/marks";
        } else if(index === 2) {
          return "/student/attendance";
        } 
      }
    }

    function lowerList() {

      if(props.currentUser === "Admin") {
        return <List>
        {['View Notifications', 'View Users', 'View Logs', 'View Attendance'].map((text, index) => (
          <ListItem button key={text}>
            <a href={lowerLink(index)}>
            <ListItemIcon>{lowerIcon(index)}</ListItemIcon>
            <ListItemText primary={text} />
            </a>
          </ListItem>
        ))}
      </List>
      }

      else if(props.currentUser === "Faculty") {
        return <List>
        {['View Notifications', 'View Students'].map((text, index) => (
          <ListItem button key={text}>
            <a href={lowerLink(index)}>
            <ListItemIcon>{lowerIcon(index)}</ListItemIcon>
            <ListItemText primary={text} />
            </a>
          </ListItem>
        ))}
      </List>
      }

      else if(props.currentUser === "Student") {
        return <List>
        {['View Notifications', 'View Marks', 'View Attendance'].map((text, index) => (
          <ListItem button key={text}>
            <a href={lowerLink(index)}>
            <ListItemIcon>{lowerIcon(index)}</ListItemIcon>
            <ListItemText primary={text} />
            </a>
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
          <Button className={classes.button} onClick={toggleDrawer('right', true)}>{props.currentUser}</Button>
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

    function whichLink() {
      if(props.showThis === "LOGGED_IN") {
        return "/notifs";
      } else {
        return "/logout";
      }
    }

    function profilePage() {
      return "/profile/" + props.currentUser;
    }

    function showPic() {
      if(props.photo) {
        return '/display_images/' + props.photo.data;
      } else {
        return ;
      }
    }

    return <Navbar collapseOnSelect variant="dark" expand="lg">
      <Navbar.Brand href="/">Gurukul</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
          <Nav.Link href="/calendar">Calendar</Nav.Link>
          <Nav.Link href="/timetable">Time Table</Nav.Link>
          <Nav.Link href={profilePage()}>Profile</Nav.Link>
      </Nav>
      {hereDrawer()}
      <Nav>
          <Nav.Link href={link2}>{show2}</Nav.Link>
      </Nav>
      <Nav>
          <div className={classes.root}>
              <a href={whichLink()}>
                <Badge badgeContent = {setNumber()} color="primary">
                  <Avatar alt={props.currentUser} src={showPic()} />
                </Badge>
              </a>
          </div>
      </Nav>
      </Navbar.Collapse>
    </Navbar>;

  };