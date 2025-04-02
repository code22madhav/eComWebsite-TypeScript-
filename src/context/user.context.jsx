import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListner, createuserfromAuth} from "../utlis/firebase/firebase.utils";

export const UserContext=createContext({    //we provide default value here aslo even if we setstate is because 
    setUser: () => null,             //if we by chance forget to wrap any children component inside 
    user: null,               //user.Provider and if it tries to access user or setUser value it will through  
});                                 // error therefore to avoid that curicumstance we set default value here also

//converting the userprovider to use reducer instead of usestate

export const USER_ACTION_TYPES={
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
    user: null,
};

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case USER_ACTION_TYPES.SET_CURRENT_USER:
        return { ...state, user: payload };
      default:
        throw new Error(`Unhandled type ${type} in userReducer`);
    }
};


export const UserProvider=({children})=>{
    const [{ user }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    
    const setUser = (user) =>
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    
    useEffect(()=>{
        const unsubscribe= onAuthStateChangedListner((user)=>{
            if (user) {
                createuserfromAuth(user);   //you must be thinking even if someone casully signIn in the website 
            }                             //it will make the user doc again and again but don't worry we have 
            setUser(user);                  //handled that case in createuserfromAuth function using if statement.
        });
        return unsubscribe;     //returning unsuscribe is impo it stops onAuthchanged listening from auth state change therefore once the component is mounted and user is checked it is final since even we are not passing any dependecy in useEffect []
    },[]);
    //    const [user, setUser]= useState(null); //otherwise real values are stored here only in useState. No need of state after changing it to reducer context provider
    const value={user};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}