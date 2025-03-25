import { createContext, useState, useEffect } from "react";

const addcartItem=(product, cartItem)=>{
    //check
    const productfound= cartItem.find((prod)=>(prod.id === product.id));

    //if we don't have then add it or increase the no
    if(productfound){
       //productfound.quantity+=1;   //this is incorrect way to update here same object is modified and refernce is not updated so react will not rerender as the react checks refernce with shallow comparision
        //return cartItem;
        return cartItem.map((item)=>( item.id===productfound.id ? {...item, quantity:productfound.quantity+=1}: item));
        
    }

    //return new cartItem array
    return [...cartItem, { ...product, quantity: 1 }];
}

export const CartContext=createContext({
    isCartopen: false,
    setCartopen: ()=>null,
    cartItem: [],
    addItemtoCart: ()=>{},
    cartCount: 0,
});

export const CartProvider=({children})=>{
    const [isCartopen, setCartopen]=useState(false);
    const [cartItem, setCartItem]=useState([]);
    const [cartCount, setcartCount]=useState(0);
    const addItemtoCart=(product)=>{
        setCartItem(addcartItem(product,cartItem));
    }
    useEffect(()=>{
        const newtotal=cartItem.reduce((total, cartItem)=>total + cartItem.quantity,0);
        setcartCount(newtotal);
    }, [cartItem])
    const value={isCartopen, setCartopen, cartItem, addItemtoCart, cartCount};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}