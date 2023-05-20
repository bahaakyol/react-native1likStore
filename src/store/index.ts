import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";

const rootReducer = combineReducers({
    product: productReducer,
});

const store = configureStore({
    reducer: rootReducer,
});
export default store