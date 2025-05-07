import {ProductCardContainer, CardFooter, Name, Price} from './product-card.style';
import { useDispatch, useSelector } from 'react-redux';

import { addItemtoCart } from '../../store/cart/cart.action';
import { selectcartItems } from '../../store/cart/cart.selector';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch=useDispatch();
  const cartItem=useSelector(selectcartItems);
  const handleClick=()=>{
    dispatch(addItemtoCart(cartItem, product));
  }
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <CardFooter>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </CardFooter>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={handleClick}>Add to card</Button>
    </ProductCardContainer>
  );
};

export default ProductCard;