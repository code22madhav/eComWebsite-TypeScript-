import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/Authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { onAuthStateChangedListner, createuserfromAuth} from "./utlis/firebase/firebase.utils";
import { setUser } from "./store/user/user.action";


function App (){
  const dispatch=useDispatch();
  useEffect(()=>{
          const unsubscribe= onAuthStateChangedListner((user)=>{
              if (user) {
                  createuserfromAuth(user);   //you must be thinking even if someone casully signIn in the website 
              }                             //it will make the user doc again and again but don't worry we have 
              dispatch(setUser(user));                  //handled that case in createuserfromAuth function using if statement.
          });
          return unsubscribe;     //returning unsuscribe is impo it stops onAuthchanged listening from auth state change therefore once the component is mounted and user is checked it is final since even we are not passing any dependecy in useEffect []
      },[dispatch]);  

  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop/*" element={<Shop/>}/>
        <Route path="auth" element={<Authentication/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
  )
}

export default App;
