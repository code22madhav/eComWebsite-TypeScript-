import { Fragment } from 'react';
import { useSelector } from 'react-redux';

// import { CategoriesContext } from '../../context/categories.context';
import { categorySelector } from '../../store/categories/category.selector';
import CategoryPreview from '../../component/category-preview/category-preview.component';

const CategoriesPreview=()=>{   
    // const {categoriesMap}=useContext(CategoriesContext);
    const categoriesMap=useSelector(categorySelector);
    /* how .keys works here when we apply .keys on array it returns an array of the keys of the object on which
    it is called in this example we have data in this format {hats:[], sneker:[]} so hats, sneaker are keys in
    for the object therefore categoriesMap.key() return ['hats', 'sneaker'] now we can apply map and itterate
    over the array.*/ 
    return(
        <Fragment>
            {Object.keys(categoriesMap).map(catTitle=>(
                <CategoryPreview key={catTitle} title={catTitle} products={categoriesMap[catTitle]}/>
            ))}


        </Fragment>
    )
}
export default CategoriesPreview;