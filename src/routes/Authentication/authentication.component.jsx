import SignupForm from "../../component/sign-up-form/sign-up-form.component";
import SigninForm from "../../component/sign-in-form/sign-in-form.component";
import {AuthenticationComponent} from './authentication.style';

const Authentication=()=>{
    return(
        <AuthenticationComponent>
            <SigninForm/>
            <SignupForm/>
        </AuthenticationComponent>
    );
}
export default Authentication;