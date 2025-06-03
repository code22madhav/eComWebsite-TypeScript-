import {all, call} from 'redux-saga/effects'
import { categoreisSaga } from './categories/category.saga'
import { userSagas } from './user/user.saga'

export function* rootSaga(){
    yield all([call(categoreisSaga), call(userSagas)]);
}