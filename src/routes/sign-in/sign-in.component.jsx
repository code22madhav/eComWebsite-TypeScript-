import { signInWithGooglePopup, createuserfromAuth } from "../../utlis/firebase/firebase.utils";

const Signin=()=>{
       
    const loguser= async()=>{
        const {user}= await signInWithGooglePopup();
        console.log(user);
        createuserfromAuth(user);
    }
    return(
        <div>
            <button onClick={loguser}>click to sign-in</button>
        </div>
    );
}
export default Signin