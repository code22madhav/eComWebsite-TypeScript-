import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {CartDropDownContainer, CartItemContainer} from './cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropDown=()=>{
    const {cartItem}=useContext(CartContext);
    const navigate=useNavigate();
    const Navigate=()=>navigate('/checkout');
    return(
    <CartDropDownContainer>
        <CartItemContainer>
            {cartItem.map((items)=>(<CartItem key={items.id} cartItem={items}/>))}
        </CartItemContainer>
        <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={()=> Navigate()}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
    )
}
export default CartDropDown;