import { createContext, useEffect, useState } from "react";
// import SHOP_DATA from '../shop-data';
import { getCollectionAndDocuments  } from "../utlis/firebase/firebase.utils";

export const CategoriesContext = createContext({ 
    products: [], 
});


export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setcategoriesMap] = useState([]);
    //we remove this after doing one time otherwise it will write the data again and again
    // useEffect(()=>{
    //     addCollectionAndDocuments ('categories', SHOP_DATA);
    // },[]);
    useEffect(()=>{
        const getData= async()=>{
            const categoriesMap= await getCollectionAndDocuments();
            setcategoriesMap(categoriesMap);
        }
        getData();
    },[])
    const value = { categoriesMap }; 
    return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
)};