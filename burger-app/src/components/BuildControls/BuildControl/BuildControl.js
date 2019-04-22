import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    console.log(props.labelName);
    return(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.labelName}</div>
        <button className={classes.More} onClick={props.addIngredient}>More</button>
        <button className={classes.Less} onClick={props.removeIngredient} disabled={props.disabledButton}>Less</button>
    </div>
)
}
export default buildControl;