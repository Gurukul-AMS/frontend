import {React, useEffect, useState} from 'react';
import Axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Marks from "./Marks";

const useStyles = makeStyles({
    body: {
        backgroundImage: 'url(https://www.imaginefactory.com/wp-content/uploads/2017/04/SPACES_BG-2.jpg)',
        backgroundSize: 'cover',
        height:'100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        objectFit: 'fill',
    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto 50px 100px 50px',
        justifyContent: 'space-between',
        paddingTop: '30px',
        maxWidth: '100%'
    },

    heading: {
        textAlign: 'center',
        paddingTop: '50px',
        fontFamily: "'Monaco', monospace",
        fontSize: '5rem',
        color: '#9ddfd3',
    }
});

export default function ViewMarks() {

    const classes = useStyles();
    const [marks, setMarks] = useState([]);

    function getMarks(){
        
        Axios.get("http://localhost:5000/api/viewmarks", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                setMarks(response.data);
            };
        })
        .catch(error => {
            console.log(error);
        });
    };

    function showMarks() {
        if(marks) {
            return (marks.map((record) => <Marks
                comp = {record.component}
                course_id = {record.course}
                score = {record.record.scored}
            />));
        } else {
            return "Oops";
        }
    };

    useEffect(() => {
        getMarks();
    });

    return (<div className={classes.body}>
            <h1 className={classes.heading}>Marks</h1>
            <div className={classes.root}>
                {showMarks()}
            </div>
    </div>)
};