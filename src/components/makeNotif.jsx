import {React, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import querystring from 'querystring';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    
    body: {
        backgroundImage: 'url(https://fsa.zobj.net/crop.php?r=nTPjmW02QQpmIyfRvvp-na0rGDwXyUgzevgqnpA6UEf6knGtKVxMeu8qS6K2qyYZ_16jrV-o8fKpQSf8bJeQoQbZmS9WQuYyJtDlQzDttO7eG7QONFiLq4Os6WAwQQWDf7VQnQqtBGO3OQ_L)',
        backgroundSize: 'cover',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    root: {
        width: '50%',
        margin: '50px auto 80px auto',
        paddingBottom: '50px',
        borderRadius: '5%',
        backgroundColor: 'white',
    },

    form: {
        '& > *': {
          width: '85%',
          display: 'flex',
          flexDirection: 'column',
          margin: '50px auto',
          backgroundColor: 'white',
        },
    },

    heading: {
        textAlign: 'center',
        paddingTop: '50px',
        fontFamily: "'Courier New', monospace",
        color: 'black',
    },

    list: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },

    button: {
        textAlign: 'center',
    },

    formControl: {
        margin: theme.spacing(3),
        display: 'flex',
        width: '100%',
        marginLeft: '40%'
    },

}));

export default function MakeNotif() {

    const classes = useStyles();
    
    const [users, updateUsers] = useState([]);
    const [whoList, updateList] = useState([]);
    const [content, updateContent] = useState();
    const [middle, changeMiddle] = useState({});

    const [open, setOpen] = useState(false);

    function getUsers() {

        axios.get("http://localhost:5000/api/makenotifs", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateUsers(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function sendNotif() {

        setOpen(true);

        axios.post("http://localhost:5000/api/makenotifs", querystring.stringify({receivers: whoList, content: content}), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then(response => {
            if(response.status === 200) {
                console.log("Notifications sent!");
            }
        });
    }

    function getOptions() {
        
        if(users.length!==0) {
            return (users.map((user) => <div className={classes.options}><FormControlLabel
                control={<Checkbox checked = {middle[user.username]} onChange = {handleChange} value = {user._id} />}
                label={user.username}
            /></div>));
        } else {
            return "None";
        }
    };

    useEffect(() => {
        getUsers();
    });

    function handleContent(event) {
        updateContent(event.target.value);
    }

    const handleChange = (event) => {
        updateList([...whoList, event.target.value]);
        changeMiddle({...middle, [event.target.value]: true});
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    };

    return (<div className={classes.body}>
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1>Send Notifications</h1>
            </div>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Content" variant="outlined" rows = "10" multiline="true" fullWidth="true" value={content} onChange={handleContent}/>
            </form>
            <div className={classes.checkbox}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Send To:</FormLabel>
                <FormGroup>
                    {getOptions()}
                </FormGroup>
            </FormControl>
            </div>
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={sendNotif}>
                    Send Notification
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Notification(s) Sent!
                </Alert>
            </Snackbar>
            </div>
        </div>
    </div>);
}

