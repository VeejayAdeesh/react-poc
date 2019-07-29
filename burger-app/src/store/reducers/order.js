import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    order: [],
    loading: false,
    purchased: false
}

const purchaseRedirect = (state) => {
    return updateObject(state, { purchased: false });
}

const purchaseLoading = (state) => {
    return updateObject(state, { loading: true });
}

const purchaseSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        orderId: action.orderId
    }
    return {
        loading: false,
        order: state.order.concat(newOrder),
        purchased: true
    };
}

const purchaseFail = (state) => {
    return updateObject(state, { loading: false, order: state.order })
}

const orderFetchLoading = (state) => {
    return updateObject(state, { loading: true })
}

const orderFetchSuccess = (state, action) => {
    const orderFetchData = { loading: false, order: action.orders }
    return updateObject(state, orderFetchData)
}

const orderFetchFail = (state) => {
    return updateObject(state, { loading: false })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCSHASED_REDIRECT: return purchaseRedirect(state);
        case actionTypes.PURCHASE_LOADING: return purchaseLoading(state);
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_FAIL: return purchaseFail(state);
        case actionTypes.ORDER_FETCH_LOADING: return orderFetchLoading(state);
        case actionTypes.ORDER_FETCH_SUCCESS: return orderFetchSuccess(state, action);
        case actionTypes.ORDER_FETCH_FAIL: return orderFetchFail(state);
        default:
            return initialState
    }
}

export default reducer