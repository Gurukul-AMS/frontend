import {React, useEffect, useState} from 'react';
import Axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Marks from "./Marks";

const useStyles = makeStyles({

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
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1>Marks</h1>
            </div>
            <div>
                {showMarks()}
            </div>
        </div>


    </div>)
};