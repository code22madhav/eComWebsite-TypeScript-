import { useParams } from "react-router-dom";
import { useEffect, Fragment, useState } from "react";
import ProductCard from "../../component/product-card/product-card.component";
import {CategoryContainer, CategoryTitle} from './category.style';
import { useSelector } from "react-redux";
import { categorySelector, selectcategoriesisLoading } from "../../store/categories/category.selector";
import Spinner from "../../component/spinner/spinner.component";

type CategoryRouteParams={
  category: string,
}
//we know useParams will never be undefined but typescipt requires it to be more safe since useParams cab
//be string or undefined therfore we are predicating it to be string via CategoryRouteParms type. 
const Category=()=>{
    const {category}=useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap=useSelector(categorySelector);
    const isLoading=useSelector(selectcategoriesisLoading)
    // const { categoriesMap }=useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
      setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
    return (
      <Fragment>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        {isLoading ? <Spinner/> : (<CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>)}
      </Fragment>
    );
  };
  

export default Category;