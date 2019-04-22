import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    console.log("Object Keys ",Object.keys(props.ingredient));
    let ingredientBurger=Object.keys(props.ingredient).map(
        igkey => {
            console.log("IGKEY ",igkey);
            console.log("Inside Map1 ",props.ingredient[igkey])
            return [...Array(props.ingredient[igkey])].map((__,i) =>{
                console.log("Inside Map2 igkey",igkey);
                return <BurgerIngredient key={igkey+i} type={igkey} />

            })
        }
    ).reduce((accValue,currValue) =>{
        console.log("Accu Value ",accValue);
        console.log("Curr Value", currValue);
        return accValue.concat(currValue)
    },[]);
    console.log("Ingredient value "+ingredientBurger.length);
    if(ingredientBurger.length === 0){
        ingredientBurger = <p>Please add the Ingredients!!!</p>
    }
    
    return (
        <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
            {ingredientBurger}
        <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;