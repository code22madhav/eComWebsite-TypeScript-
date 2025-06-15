import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoryReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer=combineReducers({
    user: userReducer,
    categories: categoryReducer,
    cart: cartReducer,
})

/*No need to type the root reducer since it's taking the type from the reducuers only which we are 
exporting for example user reducer is of type UserState. It combines all the reducer type and make the final
type */

/* whenever any of the reducer changes complete react store updates and hence whereever the useSelector is
 is called that component updates */