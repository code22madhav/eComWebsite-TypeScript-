import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";

const selectcartReducer=(state): CartState=>state.cart;

export const selectcartItems=createSelector(
    [selectcartReducer],
    (cart)=>cart.cartItems
);

export const selectIscartOpen=createSelector(
    [selectcartReducer],
    (cart)=>cart.isCartopen
);

export const selectCartTotal=createSelector(
    [selectcartItems],
    (cartItems):number=>cartItems.reduce((total, item )=>{ 
        if(item.quantity===1){
            return total+=item.price
        }
        return total+=(item.price*item.quantity)},0)
);

export const selectCartCount=createSelector(
    [selectcartItems],
    (cartItems):number=>cartItems.reduce((total, cartItem)=>total + cartItem.quantity,0)
);
/*Most of the thing are automaticlly infered by typescript as we have initially types the 
selectCartReducer to CartState therefore everywhere we are provding the same selector to memozie the 
indivisul selector with that type is also passed. */