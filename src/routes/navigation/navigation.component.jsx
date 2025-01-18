import { ReactComponent as Logo } from '../../assets/ecommerce-shop-svgrepo-com.svg';
import './navigation.style.scss';

import { Outlet, Link} from "react-router-dom";
import { Fragment, useContext } from "react";

import { UserContext } from "../../context/user.context";
import { CartContext } from '../../context/cart.context';

import { signOutUser } from "../../utlis/firebase/firebase.utils";

import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropDown from "../../component/cart-dropdown/cart-dropdown.component";

const Navigation= ()=>{
  const {user}=useContext(UserContext);
  const {isCartopen}=useContext(CartContext);
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
            {user ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) : 
            (<Link className='nav-link' to='/auth'>SIGN IN</Link>)}
            <CartIcon/>
            </div>
            {isCartopen && <CartDropDown/>}
        </div>
        <Outlet />
      </Fragment>
    );
  }

  export default Navigation;