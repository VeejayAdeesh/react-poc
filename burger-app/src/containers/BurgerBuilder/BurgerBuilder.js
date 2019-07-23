import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandlers from '../../hoc/withErrorHandlers/withErrorHanlers'
import { connect } from 'react-redux'
import { addIngredient, removeIngredient, failedIngredient, initIngredient } from '../../store/actions/index'

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        // axios.get('https://my-burger-app-af475.firebaseio.com/ingredients.json').then(response => {
        //     this.setState({ ingredients: response.data })
        // }).catch(error => {
        //     this.setState({ error: error })
        // })
        this.props.onSetIngredient()
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }


    purchaseableCancelHandler = () => {
        console.log("Event Fired");
        this.setState({ purchasing: false })
    }


    purchaseableContinueHandler = () => {
        console.log(this.props);
        //alert('You Continue Order!!')
        // this.setState({ loading: true })
        // let order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.basePrice,
        //     customer: {
        //         name: 'Veejay',
        //         sex: 'male',
        //         address: {
        //             streetName: 'Test Street',
        //             zipcode: 600000,
        //             country: 'India'
        //         }
        //     }
        // }
        // axios.post('/orders.json', order).then(response => this.setState({ loading: false, purchasing: false }))
        //     .catch(error => this.setState({ loading: false, purchasing: false }))
        // const querparam = []
        // for (let i in this.state.ingredients) {
        //     querparam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // querparam.push('totalPrice=' + this.state.basePrice)
        // const queryString = querparam.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        this.props.history.push('/checkout')
    }


    purchaseableHandler(ingredients) {
        let orderCount = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((acc, cur) => {
            return acc += cur
        }, 0)
        return orderCount > 0
    }

    render() {
        let orderData = null;
        if (this.state.loading) {
            orderData = <Spinner />
        }
        const disableButton = { ...this.props.ing };
        for (let key in disableButton) {
            disableButton[key] = disableButton[key] <= 0;
        }
        console.log("Disable Function", disableButton);

        let burger = <Spinner />
        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredient={this.props.ing} />
                    <BurgerControls ingredientAdd={this.props.onIngredientAdd}
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disableButton}
                        price={this.props.price}
                        orderButton={this.purchaseableHandler(this.props.ing)}
                        orderModal={this.purchasingHandler}
                    />
                </Aux>
            );
            orderData = <OrderSummary orderdetails={this.props.ing}
                cancelOrder={this.purchaseableCancelHandler}
                continueOrder={this.purchaseableContinueHandler}
                totalPrice={this.props.price} />
        }
        if (this.props.error) {
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

const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        price: state.basePrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(removeIngredient(ingName)),
        onSetIngredient: () => dispatch(initIngredient()),
        onErrorHandler: () => dispatch(failedIngredient())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandlers(BurgerBuilder, axios));