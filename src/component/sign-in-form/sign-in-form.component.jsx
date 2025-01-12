import { useState } from "react";
import { signInWithGooglePopup, createuserfromAuth, signInAuthUserWithEmailAndPassword} from "../../utlis/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componrnt";
import './sign-in-form.style.scss';

const defaultFormFields = {
    email: '',
    password: '',
}


const SigninForm= ()=>{
    const [formFields, setFormFields]= useState(defaultFormFields);
    const {email, password}= formFields;
    
    const resetFormFeilds=()=>{
        setFormFields(defaultFormFields);           //if we remove this fun state value will remain same and form will still look filled even after sucessfull submit 
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();         //prevent page reloding after submit
        try {
            const response= await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFeilds();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                  alert('incorrect password for email');
                  break;
                case 'auth/user-not-found':
                  alert('no user associated with this email');
                  break;
                default:
                  console.log(error);
              }
        }
    }
    const onChangeHandler=(event)=>{
        const {name, value}= event.target;
        setFormFields({...formFields,[name]:value});    //value property help to indentify which input is changed otherwise we can't write a generic function to handle all the 4 changes in input fields
    }
    //google signin Code
    const signInWithGoogle= async()=>{
        const {user}= await signInWithGooglePopup();
        await createuserfromAuth(user);
    }//type button is very much important for second button because button inside form always have a default type submit so it will trigger the handleSubmit function therfore to prevent hitting it we state it's just of type button
    return(
        <div className="sign-in-container">
            <h2>Already have a Account</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={onChangeHandler} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={onChangeHandler} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={'google'} onClick={signInWithGoogle}>Google SignIn</Button>
                </div>
            </form>
        </div>
    )
}
export default SigninForm;