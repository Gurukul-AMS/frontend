import {React, useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({

});

export default function StudentCard(props) {

    const classes = useStyles();

    return (<div className={classes.card}>
        <div className={classes.title}>
            <div>
                <h2>{props.username}</h2>
            </div>
        </div>
    </div>);
}