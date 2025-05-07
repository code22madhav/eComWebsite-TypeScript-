import { createSelector } from "reselect";

const selectcartReducer=(state)=>state.cart;

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
    (cartItems)=>cartItems.reduce((total, item )=>{ 
        if(item.quantity===1){
            return total+=item.price
        }
        return total+=(item.price*item.quantity)},0)
);

export const selectCartCount=createSelector(
    [selectcartItems],
    (cartItems)=>cartItems.reduce((total, cartItem)=>total + cartItem.quantity,0)
);