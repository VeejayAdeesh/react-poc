import React from 'react'
import Aux from '../../../hoc/Auxillary'
import classes from './OrderSummary.css'

const orderSummary = (props) =>{
    let orders = Object.keys(props.orderdetails)
                    .map(igkey =>{
                        return <li className={classes.OrderSummary}><span>{igkey} : {props.orderdetails[igkey]}</span></li>
                    })
    return (
        <Aux>
            <p>Your Burger</p>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {orders}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
}

export default orderSummary;