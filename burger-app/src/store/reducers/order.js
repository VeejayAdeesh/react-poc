import * as actionTypes from '../actions/actionTypes'

const initialState = {
    order: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCSHASED_REDIRECT:
            return {
                ...state,
                purchased: false
            };
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
                order: state.order.concat(newOrder),
                purchased: true
            };
        case actionTypes.PURCHASE_FAIL:
            return {
                loading: false,
                order: state.order
            };
        case actionTypes.ORDER_FETCH_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ORDER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.orders
            };
        case actionTypes.ORDER_FETCH_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return initialState
    }
}

export default reducer