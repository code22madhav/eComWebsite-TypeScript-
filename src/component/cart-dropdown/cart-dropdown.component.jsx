import Button from '../button/button.componrnt';
import './cart-dropdown.styles.scss';

const CartDropDown=()=>{
    return(
    <div className='cart-dropdown-container'>
        <div className='cart-items' />
        <Button>GO TO CHECKOUT</Button>
    </div>
    )
}
export default CartDropDown;