import { call, all, takeLatest, put } from "typed-redux-saga/macro";
import { getCollectionAndDocuments } from "../../utlis/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import {CATEGORIES_ACTION_TYPE} from "./category.types";
//only thing change when we type saga is instead of importing from redux-saga/effects typescript
//gives us the typed version of call,all,takeLatest,put in 'typed-redux-saga' library.
//2nd thing just use yield* instead of simple yeild

export function* fetchCategoriesAsync(){
    try{
        const categories= yield* call(getCollectionAndDocuments);
        console.log(categories);
        yield* put(fetchCategoriesSuccess(categories));
    }catch(error){
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories(){
    yield* takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoreisSaga(){
    yield* all([call(onFetchCategories)]);
}