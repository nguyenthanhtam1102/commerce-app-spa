import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { 
    fetchProductsApi,
    fetchProductApi
} from "../../api/productsApi";

const initState = {
    products: [],
    product: null,
    pagination: null,
    loading: false,
    error: false,
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ limit, page, sortBy, sortDirection, category_id, query }) => {
        try {
            const response = await fetchProductsApi(limit, page, sortBy, sortDirection, category_id, query);
            return response?.data;
        } catch(error) {
            throw error;
        }
    }
);

export const fetchProduct = createAsyncThunk(
    "products/fetchProduct",
    async (product_id) => {
        try {
            const response = await fetchProductApi(product_id);
            return response?.data;
        } catch(error) {
            throw error;
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.products = [];
                state.pagination = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload?.data;
                state.pagination = action.payload?.meta.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default productSlice.reducer;
