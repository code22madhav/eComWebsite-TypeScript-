import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "../store";
export const selectUserReducer=(state: RootState):UserState=> state.user;
export const userSelector=createSelector(
    [selectUserReducer],
    (user)=>user.currentUser
);

/*why it not directly state.currentUser because 
from this reducer eveything is combinned in root reducer where we are storing  userReducer in user key
therefore when we:
state is the entire Redux store

state.user is the slice managed by userReducer

state.user.currentUser is the actual value you want*/