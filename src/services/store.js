import { configureStore } from "@reduxjs/toolkit";
import constructor from "./reducers/constructor";
import ingredients from "./reducers/ingredients";
import order from "./reducers/order"

export const store = configureStore({
    devTools: true,
    reducer: {
        ingredientsStore: ingredients,
        constructorStore: constructor,
        orderStore: order
    }
},

);

export default store;