import React from 'react';
import classes from './Backdrop.css';


const backDrop = (props) => (
    //console.log("Backdrop ",props.show)
   props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
  //return backdrop;
  
);

export default backDrop;