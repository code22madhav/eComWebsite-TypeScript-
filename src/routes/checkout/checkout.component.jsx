import CheckoutItem from "../../component/checkoutItem/checkoutitem.component";
import PaymentForm from "../../component/payment-form/payment-form.component";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.style';

import { useSelector } from "react-redux";
import { selectcartItems, selectCartTotal } from "../../store/cart/cart.selector";

const Checkout = () => {
    const cartItems=useSelector(selectcartItems);
    const cartTotal=useSelector(selectCartTotal);
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} cartItem={item} />
            ))}
            <Total>TOTAL: ${cartTotal}</Total>
            <PaymentForm/>
        </CheckoutContainer>
    )
};

export default Checkout;