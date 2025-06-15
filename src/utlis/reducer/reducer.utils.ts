import { AnyAction } from "redux-saga";

type Matchable<AC extends ()=>AnyAction> = AC & {
    type: ReturnType<AC>['type'],
    match(action: AnyAction): action is ReturnType<AC> 
}
/*Here we are trying to define the type of the withMatcher wrapper actually its a function which wraps 
over the normal action creator and add two more properties .type and .match if you are confused how the
action creator is function will get these properties then let me tell you in JS everything is object
therfore functions are also hybrid object which can contain properties later while defining he withMatcher
function we will use .assing to add two properties
2nd thing: when we are writing match's type here we are using typescript predicate to fix the return type of
match as the return type of action creator this futher helps to narrow down the type of action */

export function withMatcher<AC extends ()=> AnyAction & {type: string}>(actionCreator: AC):Matchable<AC>; 

export function withMatcher<AC extends (...arg: any[])=> AnyAction & {type: string}>(actionCreator: AC):Matchable<AC>;

export function withMatcher(actionCreator: Function){ //this fun just extracts the type of actionCreator and
    const type= actionCreator().type;                  //and performs the double duty to match the type of action
    return Object.assign(actionCreator,{
        type,
        match(action: AnyAction){
            return action.type===type; //if this condtio passed then this means we are narrow dowing the type
        }                              //to the ReturnType<AC> which we have defined above in Matchable
    })  
}

export type ActionWithPayload<T,P>={
    type: T,
    payload: P,
}

export type Action<T>={
    type: T
}
export function createAction<T extends string , P>(type: T, payload: P):ActionWithPayload<T,P>;

export function createAction<T extends string>(type: T, payload: void):Action<T>;

export function createAction<T extends string,P>(type: T, payload: P) {
    return{ type, payload};
}

//export const createAction=(type, payload)=>({ type, payload});
