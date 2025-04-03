import { createContext, useReducer } from "react";

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

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartopen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer=((state, action)=>{
  const {type, payload}=action;

  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:{
      return{
        ...state,
        ...payload,
      };
    }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:{
      return{
        ...state,
        isCartopen:payload,
      };
    }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
})

export const CartProvider=({children})=>{
    // const [isCartopen, setCartopen]=useState(false);
    // const [cartItem, setCartItem]=useState([]);
    // const [cartCount, setcartCount]=useState(0);
    // const [totalPrice, settotalPrice]=useState(0);

    const [{cartItems, cartTotal, cartCount, isCartopen}, dispatch]=useReducer(cartReducer, INITIAL_STATE);
    const updateCartItemReducer=(newCartItem)=>{
        const newCartCount=newCartItem.reduce((total, cartItem)=>total + cartItem.quantity,0);
        const newCartTotal=newCartItem.reduce((total, item )=>{ 
          if(item.quantity===1){
              return total+=item.price
          }
          return total+=(item.price*item.quantity)},0);

          dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload:{cartItems:newCartItem, cartCount: newCartCount, cartTotal: newCartTotal}});
    }

    const setCartopen=(bool)=>{
      dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool});
    }

    const addItemtoCart=(product)=>{
        const newCartItem=addcartItem(product,cartItems);
        updateCartItemReducer(newCartItem);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItem=removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItem);
      };
    
      const clearItemFromCart = (cartItemToClear) => {
        const newCartItem=clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItem);
      };

      //No need of these useEffect we created a single function to perform all the operation which will 
      //directly pass the final payload value after all the calculations.

    // useEffect(()=>{
    //     const newtotal=cartItem.reduce((total, cartItem)=>total + cartItem.quantity,0);
    //     setcartCount(newtotal);
    // }, [cartItem])
    // useEffect(()=>{
    //     const totalprices=cartItem.reduce((total, item )=>{ 
    //         if(item.quantity===1){
    //             return total+=item.price
    //         }
    //         return total+=(item.price*item.quantity)},0);
    //     settotalPrice(totalprices);
    // }, [cartItem]);
    const value={isCartopen, setCartopen, cartItems, addItemtoCart, cartCount, cartTotal, removeItemToCart, clearItemFromCart};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}