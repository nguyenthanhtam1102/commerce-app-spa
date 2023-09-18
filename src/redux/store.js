import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from './slices/categoriesSlice';
import assetsReducer from './slices/assetsSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        assets: assetsReducer,
    }
});

export default store;