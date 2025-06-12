import { AnyAction } from "redux-saga";
import {CATEGORIES_ACTION_TYPE, Category} from "./category.types";
import {CategoryAction, fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed} from './category.action';

export type CategoriesState={
    readonly categories: Category[],
    readonly isLoading: boolean,
    readonly error: Error | null        //we add readonly to make it non changable even redux always pass new state when any action happens
}

const CATEGORY_INITIAL_STATE:CategoriesState={
    categories: [],
    isLoading: false,
    error: null
}


export const categoryReducer=((
    state=CATEGORY_INITIAL_STATE,
    // action={} as CategoryAction,
    action={} as AnyAction,
    ): CategoriesState=>{
        
    if(fetchCategoriesStart.match(action)){
        return{...state, isLoading: true};
    }
    if(fetchCategoriesSuccess.match(action)){
        return {...state, categories: action.payload, isLoading: false};
    }
    if(fetchCategoriesFailed.match(action)){
        return{...state, error:action.payload, isLoading: false};
    }
    return state;
    // const {type, payload}=action; this will give a error becaucse we have typed action of type CategpryAction
                                        //and not all the action have payload all though for some action
    // switch(action.type){                       //payload is void but its problematic to destructure it because typescript gives an error
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
    //         return{...state, isLoading: true};
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
    //         return {...state, categories: action.payload, isLoading: false};
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
    //         return{...state, error:action.payload, isLoading: false};
    //     default:
    //         return state;
    // }
})