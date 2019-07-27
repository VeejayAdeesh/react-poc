import React from 'react'
import classes from './Order.css'
const order = (props) => {
    let orderIngredient = []
    for (let ingredientsKey in props.ingredients) {
        orderIngredient.push({
            value: props.ingredients[ingredientsKey],
            id: ingredientsKey
        })
    }
    console.log("Order Price ", props.totalPrice)
    let displayOrder = orderIngredient.map(igKey =>
        <span style={{
            textTransform: 'captilazie',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }} key={igKey.id}>{igKey.id} {igKey.value}</span>
    )

    return (
        <div className={classes.Order}>
            <p>{displayOrder}</p>
            <p><strong>Price: USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>
        </div>
    )
}


export default order;