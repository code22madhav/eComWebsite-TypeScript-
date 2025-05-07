import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {CartDropDownContainer, CartItemContainer, EmptyMessage} from './cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectcartItems } from '../../store/cart/cart.selector';

const CartDropDown=()=>{
    const cartItems=useSelector(selectcartItems);
    const navigate=useNavigate();
    const Navigate=()=>navigate('/checkout');
    return(
    <CartDropDownContainer>
        <CartItemContainer>
            {cartItems && cartItems.length > 0 ? (cartItems.map((items)=>(<CartItem key={items.id} cartItem={items}/>))) : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
        </CartItemContainer>
        <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={()=> Navigate()}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
    )
}
// only {cartItem ? ():() will not work since empty array is also treated as truthy value in Js there use cartItem && cartItem.length}
export default CartDropDown;