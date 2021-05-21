import {React} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({

  root: {
      display: 'flex',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height:'100vh',
      maxWidth: '100%',
      overflow: 'hidden',
      objectFit: 'fill',
      margin: 'auto auto 50px auto'

  },

  button: {

    backgroundColor: '#21094e',
    color: 'white',
    margin: '550px auto auto auto',
    padding: '25px 100px',
    transitionDuration: '0.5s',
    '&:hover' : {

      backgroundColor: '#233e8b',
      boxShadow: '5px 5px 5px grey'
    }

  }

});

export default function Home(props) {

  const classes = useStyles();

    var path="";
    var value="";
    
    if(props.showThis === "NOT_LOGGED_IN")
    {
      path = "/login";
      value = "Login";
    }
    else if(props.showThis === "LOGGED_IN")
    {
      var role = props.currentUser;
      if(role === "Admin")
      {
        path = "/admin/logs";
        value = "View Logs";
      }
      else
      {
        path = "/profile/" + role;
        value = "View Profile";
      }
    }

    return (<div className={classes.root} style={{backgroundImage: 'url(background/home.jpg)'}}>
      <div>
          <Button className={classes.button} onClick={path} variant="contained">
              {value}
          </Button>
      </div>
    </div>);
};
