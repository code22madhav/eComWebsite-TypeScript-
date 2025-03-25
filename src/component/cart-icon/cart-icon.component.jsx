import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartIcon=()=>{
    const {isCartopen, setCartopen, cartCount}=useContext(CartContext);
    const togleCart=()=>{setCartopen(!isCartopen)};
    return(
        <div className='cart-icon-container' onClick={togleCart}>
            <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{cartCount}</span>
    </div>
    )
}
export default CartIcon;