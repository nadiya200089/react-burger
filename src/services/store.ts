import { configureStore } from "@reduxjs/toolkit";
import constructor from "./reducers/constructor";
import ingredients from "./reducers/ingredients";
import auth from "./reducers/auth";
import { apiSocket } from '../utils/apiSocket';
import order from "./reducers/order";
import feed from './reducers/feed'

export const store = configureStore({
    devTools: true,
    reducer: {
        ingredientsStore: ingredients,
        constructorStore: constructor,
        auth: auth,
        orderStore: order,
        feedStore: feed,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([apiSocket])
    },
},

);

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
