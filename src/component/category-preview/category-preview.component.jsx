import {CategoriesPreviewContainer, Preview, Title} from './category-preview.styles';
import ProductCard from "../product-card/product-card.component";
const CategoryPreview = ({ title, products }) => (
    <CategoriesPreviewContainer>
      <h2>
        <Title to={title.toLowerCase()}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)  //second parameter is always an index in these array function's
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoriesPreviewContainer>
  );
  
export default CategoryPreview;