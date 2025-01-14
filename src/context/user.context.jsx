import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListner, createuserfromAuth} from "../utlis/firebase/firebase.utils";

export const UserContext=createContext({    //we provide default value here aslo even if we setstate is because 
    setUser: () => null,             //if we by chance forget to wrap any children component inside 
    user: null,               //user.Provider and if it tries to access user or setUser value it will through  
});                                 // error therefore to avoid that curicumstance we set default value here also

export const UserProvider=({children})=>{
    useEffect(()=>{
        const unsubscribe= onAuthStateChangedListner((user)=>{
            if (user) {
                createuserfromAuth(user);   //you must be thinking even if someone casully signIn in the website 
              }                             //it will make the user doc again and again but don't worry we have 
            setUser(user);                  //handled that case in createuserfromAuth function using if statement.
        });
        return unsubscribe;
    },[]);
    const [user, setUser]= useState(null); //otherwise real values are stored here only in useState.
    const value={user,setUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}