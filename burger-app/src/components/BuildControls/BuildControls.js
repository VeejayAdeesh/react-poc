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
                         addIngredient={() =>props.ingredientAdd(controlkey.key)}
                         removeIngredient={() => props.ingredientRemove(controlkey.key)}
                         disabledButton={props.disabled[controlkey.key]}/>
                           
                            
                    })}
        </div>
    )
 
}   



export default buildControls;