import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { setCategories } from '../../store/categories/category.action';
import { getCollectionAndDocuments } from '../../utlis/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category-component/category.component';

const Shop=()=>{
  const dispatch=useDispatch();
  useEffect(()=>{
          const getData= async()=>{
              const categories= await getCollectionAndDocuments();
              dispatch(setCategories(categories));
          }
          getData();
    },[dispatch])

    return(
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category/>}/>
    </Routes>
    )
}
export default Shop;