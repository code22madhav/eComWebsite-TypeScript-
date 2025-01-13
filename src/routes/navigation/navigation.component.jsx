import { Outlet, Link} from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utlis/firebase/firebase.utils";

import { Fragment, useContext } from "react";
import { ReactComponent as Logo } from '../../assets/ecommerce-shop-svgrepo-com.svg';
import './navigation.style.scss';
const Navigation= ()=>{
  const {user, setUser}=useContext(UserContext);
  const signOutHandler=async()=>{
    await signOutUser();
    setUser(null);
  }
    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            {user ? (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>) : 
            (<Link className='nav-link' to='/auth'>SIGN IN</Link>)}
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
  }

  export default Navigation;