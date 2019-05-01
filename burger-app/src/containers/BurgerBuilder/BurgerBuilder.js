import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
        purchaseable: false,
        purchasing: false
    };

    purchasingHandler = ()=>{
        this.setState({purchasing: true})
    }


    purchaseableCancelHandler = () =>{
        console.log("Event Fired");
        this.setState({purchasing: false})
    }


    purchaseableContinueHandler = () => {
        alert('You Continue Order!!')
    }


    purchaseableHandler(ingredients){
        let orderCount = Object.keys(ingredients).map(igkey =>{
                return ingredients[igkey]
        }).reduce((acc,cur)=>{
            return acc+=cur
        },0)
        this.setState({purchaseable:orderCount>0})
        console.log(orderCount);
    }

    addIngredientHandler=(type)=>{
        let newCount = this.state.ingredients[type] + 1;
       // console.log("New Count",newCount);
        let newPrice = this.state.basePrice + INGREDIENT_PRICE[type];
       // console.log("New Price ",newPrice);
        let oldState = {...this.state};
        oldState.ingredients[type] = newCount;
        oldState.basePrice = newPrice;
        this.setState({ingredients: oldState.ingredients,
            basePrice: oldState.basePrice, 
            });
        this.purchaseableHandler(oldState.ingredients);
    }

    removeIngredientHandler=(type)=>{
        //console.log(type);
        let newCount = this.state.ingredients[type] - 1;
        if(newCount < 0){
            console.log("newCount is zero");
            return;
        }
        //console.log("New Count ",newCount);
        let newPrice = this.state.basePrice - INGREDIENT_PRICE[type];
       // console.log("New Price ",newPrice);
        let oldState = {...this.state};
        oldState.ingredients[type] = newCount;
        oldState.basePrice = newPrice;
        this.setState({ingredients: oldState.ingredients,
            basePrice: oldState.basePrice
        });
        this.purchaseableHandler(oldState.ingredients);
    }

    render(){
        const disableButton ={...this.state.ingredients};
        for(let key in disableButton){
            disableButton[key] = disableButton[key] <= 0;
        }
        console.log("Disable Function",disableButton);
        return (
            <Aux>
                <Modal show={this.state.purchasing} clickEvent={this.purchaseableCancelHandler}>
                    <OrderSummary orderdetails={this.state.ingredients}
                    cancelOrder={this.purchaseableCancelHandler}
                    continueOrder={this.purchaseableContinueHandler}
                    totalPrice={this.state.basePrice}/>
                </Modal>
                <Burger ingredient={this.state.ingredients} />
                <BurgerControls ingredientAdd={this.addIngredientHandler} 
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableButton}
                    price={this.state.basePrice}
                    orderButton={this.state.purchaseable}
                    orderModal={this.purchasingHandler}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;