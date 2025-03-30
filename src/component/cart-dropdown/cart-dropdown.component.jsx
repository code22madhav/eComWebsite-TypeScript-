import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropDown=()=>{
    const {cartItem}=useContext(CartContext);
    const navigate=useNavigate();
    const Navigate=()=>navigate('/checkout');
    return(
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItem.map((items)=>(<CartItem key={items.id} cartItem={items}/>))}
        </div>
        <Button onClick={()=> Navigate()}>GO TO CHECKOUT</Button>
    </div>
    )
}
export default CartDropDown;