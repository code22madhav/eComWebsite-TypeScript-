import CART_ACTION_TYPES from "./cart.types";

const INITIAL_STATE = {
    isCartopen: false,
    cartItems: [],
  };

/*If not action is passed therefor we setting it as empty object
And always remember to return state as default when working with redux */
export const cartReducer=((state=INITIAL_STATE, action={})=>{
    const {type, payload}=action;
  
    switch(type){
      case CART_ACTION_TYPES.SET_CART_ITEMS:{
        return{
          ...state,
          cartItems:payload,
        };
      }
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:{
        return{
          ...state,
          isCartopen:payload,
        };
      }
      default:
        return state;
    }
  })