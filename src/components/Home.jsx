import {React} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({

  root: {
      display: 'flex',
      justifyContent: 'center',
      background: '#0cebeb',  /* fallback for old browsers */
      background: '-webkit-linear-gradient(to right, #34e89e, #0f3443)',  /* Chrome 10-25, Safari 5.1-6 */
      background: 'linear-gradient(to top, #34e89e, #1e5a73)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */      
      height:'100vh',
      maxWidth: '100%',
      overflow: 'hidden',
      objectFit: 'fill',
      margin: 'auto auto 50px auto',
      flexDirection: 'column',
      textAlign: 'center'

  },

  button: {

    backgroundColor: '#194350',
    color: 'white',
    margin: '30% auto auto auto',
    padding: '25px 100px',
    transitionDuration: '0.5s',
    '&:hover' : {

      backgroundColor: '#1e6f5c',
      boxShadow: '5px 5px 5px grey'
    }

  },

  banner: {
    margin: '50px auto',
    width: '900px',
    height: '800px',
    backgroundSize: 'cover',
    textAlign: 'center',
    flex: '10',
    backgroundColor: 'white',
    borderRadius: '10%',
    padding: '30px',
    boxShadow: '20px 20px 1px #206a5d',
    transitionDuration: '1s',
    '&:hover': {
      boxShadow: 'none',
    }
    
  },
  
  heading: {
    flex: '1',
    margin: '50px auto 0 auto',
    fontFamily: "'DM Sans', sans-serif", 
    background: 'white',
    width: '100%',
    height: '120px'

  },

  h1 : {
    fontSize: '70px',
    margin: '20px auto',
    transitionDuration: '0.5s',
    '&:hover': {
      textShadow: '5px 5px grey'
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

    function goHere(){

      window.location = path;
    }

    return (<div className={classes.root} 
        // style={{backgroundImage: 'url(background/home.jpg)'}}
        >
      <div className={classes.heading}>
        <h1 className={classes.h1}>Welcome to Gurukul</h1>
      </div>
      <div className={classes.banner} style={{backgroundImage: 'url(background/undraw_Updated_resume_re_q1or.svg)'}}>
          <Button className={classes.button} onClick={goHere} variant="contained">
              {value}
          </Button>
      </div>
    </div>);
};
