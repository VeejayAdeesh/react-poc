import * as actionTypes from '../actions/actionTypes'

const initialState = {
    order: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                orderId: action.orderId
            }
            return {
                loading: false,
                order: state.order.concat(newOrder)
            };
        case actionTypes.PURCHASE_FAIL:
            return {
                loading: false,
                order: state.order
            };
        default:
            return initialState
    }
}

export default reducer