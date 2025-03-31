import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartIcon=()=>{
    const {isCartopen, setCartopen, cartCount}=useContext(CartContext);
    const togleCart=()=>{setCartopen(!isCartopen)};
    return(
        <CartIconContainer onClick={togleCart}>
            <ShoppingIcon />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
    )
}
export default CartIcon;