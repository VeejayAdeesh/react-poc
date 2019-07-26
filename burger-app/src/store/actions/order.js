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