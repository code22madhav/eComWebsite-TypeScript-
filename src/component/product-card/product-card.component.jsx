import {ProductCardContainer, CardFooter, Name, Price} from './product-card.style';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const {addItemtoCart}=useContext(CartContext);
  const handleClick=()=>{
    addItemtoCart(product);
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