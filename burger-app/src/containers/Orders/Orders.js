import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandlers from '../../hoc/withErrorHandlers/withErrorHanlers'
import * as actionTypes from '../../store/actions/index'
import { connect } from 'react-redux'


class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders()
    }

    render() {
        let ordersData = this.props.orders
        console.log("Order Data", ordersData)
        return (
            <div>
                {ordersData.map(order =>
                    <Order key={order.id} ingredients={order.ingredients} totalPrice={order.totalPrice} />
                )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.order,
        loading: state.order.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actionTypes.orderFetch())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandlers(Orders, axios))