import { call, all, takeLatest, put } from "redux-saga/effects";
import { getCollectionAndDocuments } from "../../utlis/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import {CATEGORIES_ACTION_TYPE} from "./category.types";


export function* fetchCategoriesAsync(){
    try{
        const categories= yield call(getCollectionAndDocuments, 'categories');
        console.log(categories);
        yield put(fetchCategoriesSuccess(categories));
    }catch(error){
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories(){
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoreisSaga(){
    yield all([call(onFetchCategories)]);
}