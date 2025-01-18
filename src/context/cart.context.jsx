import { createContext, useState } from "react";

export const CartContext=createContext({
    isCartopen: false,
    setCartopen: ()=>null,
});

export const CartProvider=({children})=>{
    const [isCartopen, setCartopen]=useState(false);
    const value={isCartopen, setCartopen};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}