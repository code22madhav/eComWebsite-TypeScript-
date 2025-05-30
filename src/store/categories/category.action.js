import CATEGORIES_ACTION_TYPE from "./category.types";
// import { getCollectionAndDocuments } from "../../utlis/firebase/firebase.utils";

export const fetchCategoriesStart=(()=>{
    return{type: CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START}
});

export const fetchCategoriesSuccess=((categories)=>{
    return{type: CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, payload:categories}
});

export const fetchCategoriesFailed=((error)=>{
    return{type: CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, payload:error}
});
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