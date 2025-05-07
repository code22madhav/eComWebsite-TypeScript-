import CART_ACTION_TYPES from "./cart.types";

const addcartItem=(cartItem, product)=>{
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
    cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 }: cartItem);
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const setCartopen=(bool)=>{
    return {type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool};
}

export const addItemtoCart=(cartItem,product)=>{
    const newCartItem=addcartItem(cartItem, product);
    return {type: CART_ACTION_TYPES.SET_CART_ITEMS, payload:newCartItem};
}

export const removeItemToCart = (cartItems, cartItemToRemove) => {
    const newCartItem=removeCartItem(cartItems, cartItemToRemove);
    return {type: CART_ACTION_TYPES.SET_CART_ITEMS, payload:newCartItem};
};

export const clearItemFromCart = (cartItems,cartItemToClear) => {
    const newCartItem=clearCartItem(cartItems, cartItemToClear);
    return {type: CART_ACTION_TYPES.SET_CART_ITEMS, payload:newCartItem};
};