import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoryReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer=combineReducers({
    user: userReducer,
    categories: categoryReducer,
    cart: cartReducer,
})

/* whenever any of the reducer changes complete react store updates and hence whereever the useSelector is
 is called that component updates */