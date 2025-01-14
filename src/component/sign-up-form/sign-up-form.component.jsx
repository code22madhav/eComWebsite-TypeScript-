import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createuserfromAuth } from "../../utlis/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componrnt";
import './sign-up-form.style.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignupForm= ()=>{
    const [formFields, setFormFields]= useState(defaultFormFields);
    const {displayName, email, password, confirmPassword}= formFields;
    
    const resetFormFeilds=()=>{
        setFormFields(defaultFormFields);           //if we remove this fun state value will remain same and form will still look filled even after sucessfull submit 
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();         //prevent page reloding after submit
        if(password!==confirmPassword){
            alert("Password not matching");
            return;
        }
        try {
            const {user}= await createAuthUserWithEmailAndPassword(email, password);    //this createAuth does not provide displayName explictly like signinWithGoogle therefore we pass it manually
            await createuserfromAuth(user, {displayName});
            resetFormFeilds();
        } catch (error) {
            if(error.code==='auth/email-already-in-use'){
                alert("User All Ready Exists");
            }else{
                console.log('user creation encountered an error:',error);
            }
        }
    }
    const onChangeHandler=(event)=>{
        const {name, value}= event.target;
        setFormFields({...formFields,[name]:value});    //value property help to indentify which input is changed otherwise we can't write a generic function to handle all the 4 changes in input fields
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have a Account</h2>
            <span>Create an account with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="DisplayName" type="text" required onChange={onChangeHandler} name="displayName" value={displayName}/>
                <FormInput label="Email" type="email" required onChange={onChangeHandler} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={onChangeHandler} name="password" value={password}/>
                <FormInput label="Confirm Password" type="password" required onChange={onChangeHandler} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignupForm;