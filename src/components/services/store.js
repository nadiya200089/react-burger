// import { configureStore } from "@reduxjs/toolkit";
// import constructor from "./reducers/constructor";
// import ingredients from "./reducers/ingredients";
// import order from "./reducers/order";

// export const store = configureStore({
//     reducer: {
//         ingredientsStore: ingredients,
//         constructorStore: constructor,
//         orderStore: order
//     },
//     devTools: true
// })
// export default store;


import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import constructor from "./reducers/constructor";
import ingredients from "./reducers/ingredients";
import order from "./reducers/order";
import { compose } from 'redux';

export const store = configureStore({
   devTools: true,
    reducer: {
                ingredientsStore: ingredients,
                constructorStore: constructor,
                orderStore: order
            }},
           
);


export default store;