import React, { Component } from 'react'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'


class CheckOut extends Component {

    // componentWillMount() {
    //     console.log(this.props)
    //     let price = 0;
    //     let ingredients = {}
    //     let queryparams = new URLSearchParams(this.props.location.search)
    //     console.log("query param", queryparams.entries())
    //     for (let params of queryparams.entries()) {
    //         if (params[0] === 'totalPrice') {
    //             price = +params[1]
    //         }
    //         else {
    //             ingredients[params[0]] = +params[1]
    //         }
    //         console.log(params)

    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price })
    // }

    cancelOrder = () => {
        console.log("Cancel order")
        this.props.history.goBack();
    }

    continueOrder = () => {
        this.props.history.replace('/checkout/contact-data')
    }


    render() {
        let summary = <Redirect to="/" />
        console.log("Summery CHeckOUt", summary)
        if (this.props.ing) {
            summary = (
                < div >
                    <CheckOutSummary ingredients={this.props.ing}
                        checkOutCancel={this.cancelOrder}
                        checkOutContinue={this.continueOrder} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div >
            );
        }
        console.log("Summery CHeckOUt", summary)
        return summary

    }
    // render={(props) => (<ContactData ingredients={this.state.ingredients} 
    // totalPrice={this.state.totalPrice} {...props}/>)} />
}


const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(CheckOut);
