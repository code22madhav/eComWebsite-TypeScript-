import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../context/categories.context";
import { useContext, useEffect, Fragment, useState } from "react";
import ProductCard from "../../component/product-card/product-card.component";
import {CategoryContainer, CategoryTitle} from './category.style';

const Category=()=>{
    const {category}=useParams();
    const { categoriesMap }=useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
      setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
    return (
      <Fragment>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      </Fragment>
    );
  };
  

export default Category;