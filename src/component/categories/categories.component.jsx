import CategoryItem from "../category-item/category-item.component";
import './categories.style.scss';
const Categories = ({categories})=>{
    return(
        <div className="categories-container">
            {categories.map((category) => (
                <CategoryItem key={category.id} cate3gory={category} />
            ))}
        </div>
    )
}

export default Categories;