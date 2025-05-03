import CATEGORIES_ACTION_TYPE from "./category.types";
export const setCategories=((categories)=>{
    return{type: CATEGORIES_ACTION_TYPE.SET_CATEGORIES, payload:categories}
});