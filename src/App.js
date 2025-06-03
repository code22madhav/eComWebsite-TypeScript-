import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/Authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
// import { onAuthStateChangedListner, createuserfromAuth} from "./utlis/firebase/firebase.utils";
import { checkUserSession } from "./store/user/user.action";
// import { getCurrentUser } from "./utlis/firebase/firebase.utils";


function App (){
  const dispatch=useDispatch();
  // useEffect(()=>{
  //         const unsubscribe= onAuthStateChangedListner((user)=>{
  //             if (user) {
  //                 createuserfromAuth(user);   //you must be thinking even if someone casully signIn in the website 
  //             }                             //it will make the user doc again and again but don't worry we have 
  //             dispatch(setUser(user));                  //handled that case in createuserfromAuth function using if statement.
  //         });
  //         return unsubscribe;     //returning unsuscribe is impo it stops onAuthchanged listening from auth state change therefore once the component is mounted and user is checked it is final since even we are not passing any dependecy in useEffect []
  //     },[dispatch]);  

  useEffect(()=>{
    dispatch(checkUserSession());
  },[dispatch]);
  /*One thing which I learned about useEffect: earlier i was thinking why signout automatically doesn't
  updates to signIn when we click it, in this particular senerio  what we are doing we are just calling
  the checkUserSession once and inside that checkUserSession we are calling it once then immediatly 
  we are unsuscribing it, it's sort of checking the user only once when app.js mounts
  But it was working fine earlier because earlier we we calling onStateChangedListner in useEffect 
  and we were returning the unsubscibe this doesn't call the unscusribe immedialty instead it return 
  when the app.js unmount from the UI So this was this listner was continously active and listning the
  sign In sign out call and updating the setUser state appropiately in background
  Key learning: useEffect returns or stops when only the component is unmounted from UI*/

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
