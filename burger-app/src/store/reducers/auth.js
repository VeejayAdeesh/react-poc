import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    userId: null,
    idToken: null,
    error: null,
    loading: false
}

const authLoad = (state) => {
    return updateObject(state, { loading: true })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        idToken: action.idToken,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOAD: return authLoad(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        default: return state;

    }
}

export default reducer