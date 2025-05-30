import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchCategoriesStart } from '../../store/categories/category.action';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category-component/category.component';

const Shop=()=>{
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(fetchCategoriesStart());
  },[dispatch]) //if you remove this dispatch from dependecy array it will through a waring it do't hv anyuse 

    return(
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category/>}/>
    </Routes>
    )
}
export default Shop;