import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initalState = {
    ingredients: null,
    error: false,
    basePrice: 4,
}

const INGREDIENT_PRICE = {
    salad: 0.4,
    meat: 0.5,
    cheese: 0.6,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updateAddIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedAddIngredient = updateObject(state.ingredients, updateAddIngredient);
    const updateAddIngredientPrice = { ingredients: updatedAddIngredient, basePrice: state.basePrice + INGREDIENT_PRICE[action.ingredientName] };
    return updateObject(state, updateAddIngredientPrice);
}

const removeIngredient = (state, action) => {
    const updateRemoveIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedRemoveIngredient = updateObject(state.ingredients, updateRemoveIngredient);
    const updateRemoveIngredientPrice = { ingredients: updatedRemoveIngredient, basePrice: state.basePrice - INGREDIENT_PRICE[action.ingredientName] };
    return updateObject(state, updateRemoveIngredientPrice);
}

const setIngredients = (state, action) => {
    const setIngredient = {
        ingredients: action.ingredient,
        basePrice: 4,
        error: false
    };
    return updateObject(state, setIngredient);
}

const failedIngredient = (state) => {
    updateObject(state, { error: true });
}
const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENT: return setIngredients(state, action);
        case actionTypes.FAILED_INGREDIENT: return failedIngredient(state);
        default:
            return state
    }

}

export default reducer