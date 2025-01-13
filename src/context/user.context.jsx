import { createContext, useState } from "react";

export const UserContext=createContext({    //we provide default value here aslo even if we setstate is because 
    setUser: () => null,             //if we by chance forget to wrap any children component inside 
    user: null,               //user.Provider and if it tries to access user or setUser value it will through  
});                                 // error therefore to avoid that curicumstance we set default value here also

export const UserProvider=({children})=>{
    const [user, setUser]= useState(null); //otherwise real values are stored here only in useState.
    const value={user,setUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}