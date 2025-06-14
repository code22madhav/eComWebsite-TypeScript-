import { AnyAction } from "redux-saga";
import {CartItem} from "./cart.types";
import { setCartopen, setCartItems } from "./cart.action";

export type CartState={
  readonly isCartopen: boolean,
  readonly cartItems: CartItem[],
}

const INITIAL_STATE: CartState = {
    isCartopen: false,
    cartItems: [],
  };

/*If not action is passed therefor we setting it as empty object
And always remember to return state as default when working with redux */
export const cartReducer=((state=INITIAL_STATE, action: AnyAction)=>{ //no need to do like this Action={} as 
    // const {type, payload}=action;                                  AnyAction, no need to pass empty object 
    if(setCartopen.match(action)){                               //as Initial value as we are no more destructing 
      return{...state, isCartopen:action.payload};                  //the payload and action from it
    }
    if(setCartItems.match(action)){
      return{...state, cartItems:action.payload};
    }

    
  
    // switch(type){
    //   case CART_ACTION_TYPES.SET_CART_ITEMS:{
    //     return{
    //       ...state,
    //       cartItems:payload,
    //     };
    //   }
    //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:{
    //     return{
    //       ...state,
    //       isCartopen:payload,
    //     };
    //   }
    //   default:
    //     return state;
    // }
  })