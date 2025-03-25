import Button from '../button/button.componrnt';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartDropDown=()=>{
    const {cartItem}=useContext(CartContext);
    return(
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItem.map((items)=>(<CartItem key={items.id} cartItem={items}/>))}
        </div>
        <Button>GO TO CHECKOUT</Button>
    </div>
    )
}
export default CartDropDown;