import {React, useEffect, useState} from 'react';
import axios from 'axios';


export default function Calendar() {

    const [calendar, updateCal] = useState({
        data: "",
        contentType: ""
    });

    function getCalendar() {
        axios.get("http://localhost:5000/api/calendar", {withCredentials: true}).then(response => {
            if(response.status === 200) {
                updateCal(response.data);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(()=> {
        getCalendar();
    });

    return (<div>
        <img alt="Academic Calendar" src={calendar.data}/>
    </div>);
}