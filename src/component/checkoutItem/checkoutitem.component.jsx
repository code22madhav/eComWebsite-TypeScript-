import {Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value} from './checkoutitem.style';
import { useDispatch, useSelector } from "react-redux";
import {addItemtoCart, removeItemToCart, clearItemFromCart} from '../../store/cart/cart.action';
import { selectcartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
  const dispatch=useDispatch();
  const cartItems=useSelector(selectcartItems);
  const { name, imageUrl, price, quantity } = cartItem;
  /*Just to avoide confusion earlier if you see we were just calling addItemtoCart with cartItem parameter
  and full cartItems array was accessible from the context but now after migrating we need to pass
  the cartItem array also therefore we are using useSelector to get cartItems from reducer
  hence first one is complete cart and 2nd arrgument is just the product which we have to add */
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,cartItem));
  const addItemHandler = () => dispatch(addItemtoCart(cartItems,cartItem));
  const removeItemHandler = () => dispatch(removeItemToCart(cartItems,cartItem));
  
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