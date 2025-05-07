import { ReactComponent as Logo } from '../../assets/ecommerce-shop-svgrepo-com.svg';
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from './navigation.style';

import { Outlet} from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from 'react-redux';

import { userSelector } from '../../store/user/user.selector';
import { selectIscartOpen } from '../../store/cart/cart.selector';

import { signOutUser } from "../../utlis/firebase/firebase.utils";

import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropDown from "../../component/cart-dropdown/cart-dropdown.component";

const Navigation= ()=>{
  const user=useSelector(userSelector);
  const isCartopen=useSelector(selectIscartOpen);
    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <Logo className='logo' />
            </LogoContainer>
            <NavLinksContainer>
            <NavLink to='/shop'>SHOP</NavLink>
            {user ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) :
            (<NavLink to='/auth'>SIGN IN</NavLink>)}
            <CartIcon/>
            </NavLinksContainer>
            {isCartopen && <CartDropDown/>}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    ); /*style component provides one powerful feature where we can directly tell it which html tag we want in as={} */
  }

  export default Navigation;