import { call, put, all, takeLatest } from "typed-redux-saga/macro";
import { User } from "firebase/auth";
import { getCurrentUser,
    createuserfromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser, 
    AdditionalData} from "../../utlis/firebase/firebase.utils";
import {USER_ACTION_TYPES} from "./user.types";
import { signInFailed, signInSuccess, signUpFailed, signUpSuccess, signOutFailed, signOutSuccess, EmailSignInStart, SignUpStart, SignUpSuccess } from "./user.action";

export function* getSnapshotFromUserAuth(userAuth:User, additionalData?: AdditionalData){
    try {
        const userSnapshot=yield* call(createuserfromAuth, userAuth, additionalData);
        if(userSnapshot){
          yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated(){
    try {
        // const user=yield* call(getCurrentUser().then((user)=> user)); this is wrong syntax actuall yeild
                                                //itself handles it as await therefore no need to explictly
                                                //write .then()
        const userAuth=yield* call(getCurrentUser);
        if(!userAuth) return;
        yield* call(getSnapshotFromUserAuth,userAuth);
        // yield* put(signInSuccess(userAuth)) this we can't do directly we have to go throught that pass
        // of createuserfromAuth otherwise we will be missing creating users in firebase storage.
        //and second thing this is something complete userImpl object kind of complete data or object
        //which we get once we see any user loged according to my understading we can extra data from
        //here also by doing userAuth.displayName like this but it's not good practice maybe therfore
        //we create a snapshot in next function and do snapshot.data() to get user object.
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signOut(){
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } }:SignUpStart) {
  try {
    const { user } = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield* put(signUpSuccess(user, { displayName })); //our createuserisauth is defined in such a way that if display name doesn't comes with the authentication proces then we pass it as additional data and it expects any addional data in form of object therefore we are passing {displayname} like this inseatd of durectly display name in argunent othewise it will divide the name in strings and create problem
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}
export function* signInAfterSignUp({ payload: { user, additionalDetails } }:SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signInWithEmail({payload:{email, password}}:EmailSignInStart){
    try {
        const { user }=yield* call(signInAuthUserWithEmailAndPassword, email, password);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}
export function* signInWithGoogle(){
    try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* onCheckUserSession(){
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);  
}

export function* onGoogleSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart(){
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas(){
    yield* all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)]);
}

