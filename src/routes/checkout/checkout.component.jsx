import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CheckoutItem from "../../component/checkoutItem/checkoutitem.component";
import './checkout.style.scss';

const Checkout = () => {
    const { cartItem, totalPrice } = useContext(CartContext);
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItem.map((item) => (
                <CheckoutItem key={item.id} cartItem={item} />
            ))}
            <div className='total'>TOTAL: ${totalPrice}</div>
        </div>
    )
};

export default Checkout;