import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';

import { useDispatch, useSelector } from 'react-redux';
import {setCartopen} from '../../store/cart/cart.action';
import { selectIscartOpen, selectCartCount } from '../../store/cart/cart.selector';

const CartIcon=()=>{
    const dispatch=useDispatch();
    const isCartopen=useSelector(selectIscartOpen)
    const cartCount=useSelector(selectCartCount);

    const togleCart=()=>{dispatch(setCartopen(!isCartopen))};
    return(
        <CartIconContainer onClick={togleCart}>
            <ShoppingIcon />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
    )
}
export default CartIcon;