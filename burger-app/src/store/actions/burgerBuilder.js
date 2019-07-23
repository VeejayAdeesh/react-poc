import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredient = (ingredient) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredient: ingredient
    }
}

export const failedIngredient = () => {
    return {
        type: actionTypes.FAILED_INGREDIENT
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://my-burger-app-af475.firebaseio.com/ingredients.json').then(response => {
            dispatch(setIngredient(response.data))
        }).catch(error => {
            dispatch(failedIngredient())
        })
    }
}