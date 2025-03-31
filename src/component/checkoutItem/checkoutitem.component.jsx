import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import {Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value} from './checkoutitem.style';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
  
    const { clearItemFromCart, addItemtoCart, removeItemToCart } = useContext(CartContext);
  
    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemtoCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);
  
    return (
      <CheckoutItemContainer>
        <ImageContainer>
          <img src={imageUrl} alt={`${name}`} />
        </ImageContainer>
        <BaseSpan> {name} </BaseSpan>
        <Quantity>
          <Arrow onClick={removeItemHandler}>
            &#10094;
          </Arrow>
          <Value>{quantity}</Value>
          <Arrow onClick={addItemHandler}>
            &#10095;
          </Arrow>
        </Quantity>
        <BaseSpan> {price}</BaseSpan>
        <RemoveButton onClick={clearItemHandler}>
          &#10005;
        </RemoveButton>
      </CheckoutItemContainer>
    );
  };
  
  export default CheckoutItem;