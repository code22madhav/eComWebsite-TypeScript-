import './product-card.style.scss';
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
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='card-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={handleClick}>Add to card</Button>
    </div>
  );
};

export default ProductCard;