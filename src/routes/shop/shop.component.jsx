import { useContext } from 'react';
import { ProductContext } from '../../context/product.context';
import ProductCard from '../../component/product-card/product-card.component';

import './shop.styles.scss';

const Shop=()=>{   
    const {product}=useContext(ProductContext);
    return(
        <div className='products-container'>
            { product.map((prod)=>(
                    <ProductCard key={product.id} product={prod}/>
            ))}
        </div>
    )
}
export default Shop;