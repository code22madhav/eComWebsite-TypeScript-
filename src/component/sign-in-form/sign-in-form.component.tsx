import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError } from "firebase/auth";
// import { signInAuthUserWithEmailAndPassword} from "../../utlis/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import {SignInContainer, ButtonContainer} from './sign-in-form.style';
import { useDispatch } from "react-redux";

const defaultFormFields = {
    email: '',
    password: '',
}


const SigninForm= ()=>{
    const [formFields, setFormFields]= useState(defaultFormFields);
    const {email, password}= formFields;
    const dispatch=useDispatch();
    
    const resetFormFeilds=()=>{
        setFormFields(defaultFormFields);           //if we remove this fun state value will remain same and form will still look filled even after sucessfull submit 
    }
    const handleSubmit=async(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();         //prevent page reloding after submit
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFeilds();
        } catch (error) {
            switch ((error as AuthError).code) {
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
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        const {name, value}= event.target;
        setFormFields({...formFields,[name]:value});    //value property help to indentify which input is changed otherwise we can't write a generic function to handle all the 4 changes in input fields
    }
    //google signin Code
    const signInWithGoogle= async()=>{
        dispatch(googleSignInStart());
    }//type button is very much important for second button because button inside form always have a default type submit so it will trigger the handleSubmit function therfore to prevent hitting it we state it's just of type button
    return(
        <SignInContainer>
            <h2>Already have a Account</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={onChangeHandler} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={onChangeHandler} name="password" value={password}/>
                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google SignIn</Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
}
export default SigninForm;