import { Link } from 'react-router-dom';
import './category-preview.styles.scss';
import ProductCard from "../product-card/product-card.component";
const CategoryPreview = ({ title, products }) => (
    <div className='category-preview-container'>
      <h2>
        <Link to={title.toLowerCase()}><span className='title'>{title.toUpperCase()}</span></Link>
      </h2>
      <div className='preview'>
        {products
          .filter((_, idx) => idx < 4)  //second parameter is always an index in these array fun
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
  
export default CategoryPreview;