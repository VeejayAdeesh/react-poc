import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandlers from '../../hoc/withErrorHandlers/withErrorHanlers'

const INGREDIENT_PRICE = {
    salad: 0.4,
    meat: 0.5,
    cheese: 0.6,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        basePrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('https://my-burger-app-af475.firebaseio.com/ingredients.json').then(response => {
            this.setState({ ingredients: response.data })
        }).catch(error => {
            this.setState({ error: error })
        })
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }


    purchaseableCancelHandler = () => {
        console.log("Event Fired");
        this.setState({ purchasing: false })
    }


    purchaseableContinueHandler = () => {
        //alert('You Continue Order!!')
        this.setState({ loading: true })
        let order = {
            ingredients: this.state.ingredients,
            price: this.state.basePrice,
            customer: {
                name: 'Veejay',
                sex: 'male',
                address: {
                    streetName: 'Test Street',
                    zipcode: 600000,
                    country: 'India'
                }
            }
        }
        axios.post('/orders.json', order).then(response => this.setState({ loading: false, purchasing: false }))
            .catch(error => this.setState({ loading: false, purchasing: false }))
    }


    purchaseableHandler(ingredients) {
        let orderCount = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((acc, cur) => {
            return acc += cur
        }, 0)
        this.setState({ purchaseable: orderCount > 0 })
        console.log(orderCount);
    }

    addIngredientHandler = (type) => {
        let newCount = this.state.ingredients[type] + 1;
        // console.log("New Count",newCount);
        let newPrice = this.state.basePrice + INGREDIENT_PRICE[type];
        // console.log("New Price ",newPrice);
        let oldState = { ...this.state };
        oldState.ingredients[type] = newCount;
        oldState.basePrice = newPrice;
        this.setState({
            ingredients: oldState.ingredients,
            basePrice: oldState.basePrice,
        });
        this.purchaseableHandler(oldState.ingredients);
    }

    removeIngredientHandler = (type) => {
        //console.log(type);
        let newCount = this.state.ingredients[type] - 1;
        if (newCount < 0) {
            console.log("newCount is zero");
            return;
        }
        //console.log("New Count ",newCount);
        let newPrice = this.state.basePrice - INGREDIENT_PRICE[type];
        // console.log("New Price ",newPrice);
        let oldState = { ...this.state };
        oldState.ingredients[type] = newCount;
        oldState.basePrice = newPrice;
        this.setState({
            ingredients: oldState.ingredients,
            basePrice: oldState.basePrice
        });
        this.purchaseableHandler(oldState.ingredients);
    }

    render() {
        let orderData = null;
        if (this.state.loading) {
            orderData = <Spinner />
        }
        const disableButton = { ...this.state.ingredients };
        for (let key in disableButton) {
            disableButton[key] = disableButton[key] <= 0;
        }
        console.log("Disable Function", disableButton);

        let burger = <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            orderData = <OrderSummary orderdetails={this.state.ingredients}
                cancelOrder={this.purchaseableCancelHandler}
                continueOrder={this.purchaseableContinueHandler}
                totalPrice={this.state.basePrice} />
        }
        if(this.state.error){
            burger = <p>Unable to Load Ingredients !!!</p>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} clickEvent={this.purchaseableCancelHandler}>
                    {orderData}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandlers(BurgerBuilder, axios);