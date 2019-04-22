import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad: 0.4,
    meat: 0.5,
    cheese: 0.6,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        basePrice: 4,
        totalPrice: 0
    };

    addIngredientHandler=(type)=>{
        let newCount = this.state.ingredients[type] + 1;
       // console.log("New Count",newCount);
        let newPrice = this.state.basePrice + INGREDIENT_PRICE[type];
       // console.log("New Price ",newPrice);
        let oldState = {...this.state};
        oldState.ingredients[type] = newCount;
        oldState.totalPrice = newPrice;
        this.setState({ingredients: oldState.ingredients,
            basePrice: 4, 
            totalPrice:oldState.totalPrice});
    }

    removeIngredientHandler=(type)=>{
        console.log(type);
        let newCount = this.state.ingredients[type] - 1;
        if(newCount < 0){
            console.log("newCount is zero");
            return;
        }
        console.log("New Count ",newCount);
        let newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        console.log("New Price ",newPrice);
        let oldState = {...this.state};
        oldState.ingredients[type] = newCount;
        oldState.totalPrice = newPrice;
        this.setState({ingredients: oldState.ingredients,
            basePrice: 4,
            totalPrice: oldState.totalPrice
        });
    }

    render(){
        const disableButton ={...this.state.ingredients};
        for(let key in disableButton){
            disableButton[key] = disableButton[key] <= 0;
        }
        console.log("Disable Function",disableButton);
        return (
            <Aux>
                <Burger ingredient={this.state.ingredients} />
                <BurgerControls ingredientAdd={this.addIngredientHandler} 
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableButton}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;