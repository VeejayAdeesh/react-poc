import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const burgerControl = [
    {label:'Salad', key:'salad'},
    {label:'Meat', key:'meat'},
    {label:'Bacon', key:'bacon'},
    {label:'Cheese', key:'cheese'}
];

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            {burgerControl.map((controlkey)=>{
                return <BuildControl key={controlkey.label}
                         labelName={controlkey.label}
                         addIngredient={()=>{
                            console.log("Clicked Event"); 
                            props.ingredientAdd(controlkey.key)}
                        }/>
            })}
        </div>
    )
 
}   


export default buildControls;