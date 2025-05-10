import CART_ACTION_TYPES from "../cart/cart.types";
import CATEGORIES_ACTION_TYPE from "./category.types";
const CATEGORY_INITIAL_STATE={
    categories: [],
    isLoading: false,
    error: null
}


export const categoryReducer=((state=CATEGORY_INITIAL_STATE,action={})=>{
    const {type, payload}=action;

    switch(type){
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
            return{...state, isLoading: true};
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: payload, isLoading: false};
        case CART_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return{...state, error:payload, isLoading: false};
        default:
            return state;
    }
})