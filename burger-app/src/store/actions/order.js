import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: orderId,
        orderData: orderData
    };
}

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    };
}

const purchaseLoading = () => {
    return {
        type: actionTypes.PURCHASE_LOADING
    };
}

export const purchasedRedirect = () => {
    return {
        type: actionTypes.PURCSHASED_REDIRECT
    }
}

export const purchaseOrder = (orderData) => {
    return dispatch => {
        dispatch(purchaseLoading())
        axios.post('/orders.json', orderData).then(response => {
            dispatch(purchaseSuccess(response.data.name, response.data))
        })
            .catch(error => {
                dispatch(purchaseFail(error))
            })
    };
}

export const orderFetchSuccess = (orders) => {
    return {
        type: actionTypes.ORDER_FETCH_SUCCESS,
        orders: orders
    };
}

export const orderFetchFail = (error) => {
    return {
        type: actionTypes.ORDER_FETCH_FAIL,
        error: error
    };
}

export const orderFetchLoad = () => {
    return {
        type: actionTypes.ORDER_FETCH_LOADING
    }
}

export const orderFetch = () => {
    return dispatch => {
        dispatch(orderFetchLoad())
        let fetchData = [];
        axios.get('/orders.json').then(response => {
            for (let key in response.data) {
                fetchData.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(orderFetchSuccess(fetchData))
        }).catch(error => {
            dispatch(orderFetchFail(error))
        })
    };
}