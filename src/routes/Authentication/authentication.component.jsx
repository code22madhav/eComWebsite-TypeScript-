import SignupForm from "../../component/sign-up-form/sign-up-form.component";
import SigninForm from "../../component/sign-in-form/sign-in-form.component";
import './authentication.style.scss';

const Authentication=()=>{
    return(
        <div className="authentication-container">
            <SigninForm/>
            <SignupForm/>
        </div>
    );
}
export default Authentication;