import {all, call} from 'redux-saga/effects'
import { categoreisSaga } from './categories/category.saga'

export function* rootSaga(){
    yield all([call(categoreisSaga)])
}