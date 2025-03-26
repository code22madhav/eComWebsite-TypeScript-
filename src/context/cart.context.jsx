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

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
  
    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
  
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };
  
  const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext=createContext({
    isCartopen: false,
    setCartopen: ()=>null,
    cartItem: [],
    addItemtoCart: ()=>{},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    totalPrice: 0,
});

export const CartProvider=({children})=>{
    const [isCartopen, setCartopen]=useState(false);
    const [cartItem, setCartItem]=useState([]);
    const [cartCount, setcartCount]=useState(0);
    const [totalPrice, settotalPrice]=useState(0);
    const addItemtoCart=(product)=>{
        setCartItem(addcartItem(product,cartItem));
    }
    const removeItemToCart = (cartItemToRemove) => {
        setCartItem(removeCartItem(cartItem, cartItemToRemove));
      };
    
      const clearItemFromCart = (cartItemToClear) => {
        setCartItem(clearCartItem(cartItem, cartItemToClear));
      };
    useEffect(()=>{
        const newtotal=cartItem.reduce((total, cartItem)=>total + cartItem.quantity,0);
        setcartCount(newtotal);
    }, [cartItem])
    useEffect(()=>{
        const totalprices=cartItem.reduce((total, item )=>{ 
            if(item.quantity===1){
                return total+=item.price
            }
            return total+=(item.price*item.quantity)},0);
        settotalPrice(totalprices);
    }, [cartItem]);
    const value={isCartopen, setCartopen, cartItem, addItemtoCart, cartCount, setCartItem, totalPrice, removeItemToCart, clearItemFromCart};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}