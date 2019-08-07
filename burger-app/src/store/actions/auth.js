import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authLoad = () => {
    return {
        type: actionTypes.AUTH_LOAD
    };
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    };
}

export const authFail = (error) => {
    console.log("Received Error", error)
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = (expiresTime) => {
    console.log("Expires Time ", expiresTime)
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresTime * 1000)
    }
}

export const authHelper = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authLoad())
        console.log("Email ", email)
        console.log("Password ", password)
        const authInfo = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9y9CgNkVDT-SmG0djXUfGuG3uf9-4yyU'
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9y9CgNkVDT-SmG0djXUfGuG3uf9-4yyU'
        }
        axios.post(url, authInfo)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
                dispatch(authLogout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error.response.data.error.message))
            })
    }
}