import {CATEGORIES_ACTION_TYPE, Category} from "./category.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utlis/reducer/reducer.utils";
// import { getCollectionAndDocuments } from "../../utlis/firebase/firebase.utils";

export type FetchCategoriesStart=Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess=ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,Category[]>
export type FetchCategoriesFailed=ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, Error>


export const fetchCategoriesStart=withMatcher(():FetchCategoriesStart=> createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess=withMatcher((categories: Category[]):FetchCategoriesSuccess=>createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categories));

export const fetchCategoriesFailed=withMatcher((error: Error):FetchCategoriesFailed=> createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error));

export type CategoryAction= FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

// These action creaters will give us actions something like this: { type: 'FETCH_CATEGORIES_START' }

/*
simple action without typeScript:
export const fetchCategoresSuccess=(categories)=>createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categories)
*/

/*Redux action should be a plain javaScript object
redux thunk allows us to write async logics in action creator it is added in middleware
whenever a function is dispatched from dispatch it interprets it as async action instead of plain 
action.
Redux thunk takes the func and pass it into a dispatch.
If you are wondering of the dispatch arguments then it automatically injected by the redux-thunk 
its something like this
const reduxthunkMiddleware=(store)=>(next)=>(action)=>{
    if(typeof(action)===function){
        action(dispatch)
    }
}
*/

//We were passing this function as action to thunk to make async call from shop component now we have
// migrated to saga and we are calling fetchcategorystart from shop component.


// export const fetchCategoriesAsync=()=>async(dispatch)=>{
//     dispatch(fetchCategoriesStart());
//     try{
//         const categories= await getCollectionAndDocuments();
//         dispatch(fetchCategoriesSuccess(categories));
//     }catch(error){
//         dispatch(fetchCategoriesFailed(error));
//     }
// }