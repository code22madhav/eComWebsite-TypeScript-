import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import { CategoryItem } from "../categories/category.types";
import { withMatcher, ActionWithPayload, createAction } from "../../utlis/reducer/reducer.utils";

const addcartItem=(cartItem: CartItem[], product: CategoryItem): CartItem[]=>{
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
// find the cart item to remove
const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
);

// check if quantity is equal to 1, if it is remove that item from the cart
if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
}

// return back cartitems with matching cart item with reduced quantity
return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 }: cartItem);
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetCartopen=ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItem=ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartopen=withMatcher((bool: boolean):SetCartopen=>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems=withMatcher((cartItems: CartItem[]):SetCartItem=>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemtoCart=(cartItem: CartItem[],product: CategoryItem)=>{
    const newCartItem=addcartItem(cartItem, product);
    return setCartItems(newCartItem);
};

export const removeItemToCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItem=removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItem);
};

export const clearItemFromCart = (cartItems: CartItem[],cartItemToClear: CartItem) => {
    const newCartItem=clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItem);
};