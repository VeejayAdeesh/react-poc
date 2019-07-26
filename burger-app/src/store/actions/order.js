import * as actionTypes from './actionTypes'
import axios from '../../../axios-order'

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

export const purchaseOrder = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData).then(response =>
            purchaseSuccess(response.data, response.data)
                .catch(error => {
                    purchaseFail(error)
                })
    };
}