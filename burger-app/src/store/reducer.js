import * as actionTypes from './action'

const initalState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    basePrice: 4,
}

const INGREDIENT_PRICE = {
    salad: 0.4,
    meat: 0.5,
    cheese: 0.6,
    bacon: 0.7
}

const reducer = (state = initalState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                 ingredients:{
                     ...state.ingredients,
                     [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                 },
                 basePrice: state.basePrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                basePrice: state.basePrice - INGREDIENT_PRICE[action.ingredientName]
            };
        default:
            return state
    }

}

export default reducer