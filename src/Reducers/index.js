import { combineReducers } from "redux";
import addRessReducer from "./addressReducer";
import cartReducer from "./cartReducer";
import cashReducer from "./cashReducer";
import couponReducer from "./couponReducer";
import drawerReducer from "./drawerReducer";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";

const rootReducer=combineReducers({
   user:userReducer,
   search:searchReducer,
   cart:cartReducer,
   drawer:drawerReducer,
   coupon:couponReducer,
   cashOn:cashReducer,
   address:addRessReducer
})

export default rootReducer;