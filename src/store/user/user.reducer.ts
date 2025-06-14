import { UserData } from '../../utlis/firebase/firebase.utils';
import { AnyAction } from 'redux-saga';
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed } from './user.action';

export type UserState={
  readonly isLoading: boolean,
  readonly currentUser: UserData | null
  readonly error: null | Error,
}
const INITIAL_STATE: UserState = {
    isLoading: false,
    currentUser: null,
    error: null,
};

export const userReducer = (state= INITIAL_STATE, action: AnyAction):UserState => {
  if(signInSuccess.match(action)){
    return { ...state, currentUser: action.payload };
  }
  if(signOutSuccess.match(action)){
    return { ...state, currentUser: null };
  }
  if(signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)){
    return { ...state, error: action.payload };
  }
  return state;
};