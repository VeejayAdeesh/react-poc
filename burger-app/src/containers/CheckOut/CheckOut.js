import React, { Component } from 'react'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData';


class CheckOut extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        console.log(this.props)
        let price = 0;
        let ingredients = {}
        let queryparams = new URLSearchParams(this.props.location.search)
        console.log("query param", queryparams.entries())
        for (let params of queryparams.entries()) {
            if (params[0] === 'totalPrice') {
                price = +params[1]
            }
            else {
                ingredients[params[0]] = +params[1]
            }
            console.log(params)

        }
        this.setState({ ingredients: ingredients, totalPrice: price })
    }

    cancelOrder = () => {
        console.log("Cancel order")
        this.props.history.goBack();
    }

    continueOrder = () => {
        this.props.history.replace('/checkout/contact-data')
    }


    render() {
        return (
            <div>
                <CheckOutSummary ingredients={this.state.ingredients}
                    checkOutCancel={this.cancelOrder}
                    checkOutContinue={this.continueOrder} />
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} 
                    totalPrice={this.state.totalPrice} {...props}/>)} />
            </div>
            );
        
    }
}
    
    export default CheckOut;
