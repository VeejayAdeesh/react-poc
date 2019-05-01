import React from 'react'
import Aux from '../../../hoc/Auxillary'
import classes from './OrderSummary.css'
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
    let orders = Object.keys(props.orderdetails)
                    .map(igkey =>{
                        return <li className={classes.OrderSummary} key={igkey}><span>{igkey} : {props.orderdetails[igkey]}</span></li>
                    })
    return (
        <Aux>
            <p>Your Burger</p>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {orders}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelOrder}>Cancel</Button>
            <Button btnType="Success" clicked={props.continueOrder}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;