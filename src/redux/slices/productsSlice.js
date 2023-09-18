import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { 
    fetchProductsApi,
    fetchProductVariantsApi,
    fetchProductApi,
    createProductApi,
    setAssetsForProductApi,
    deleteProductApi,
} from "../../api/productsApi";

const initState = {
    products: [],
    productVariants: [],
    product: null,
    pagination: null,
    loading: false,
    error: false,
    createStatus: null,
    deleteStatus: null
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

export const fetchProductVariants = createAsyncThunk(
    "products/fetchProductVariants",
    async (productId) => {
        try {
            const response = await fetchProductVariantsApi(productId);
            return response?.data;
        } catch(error) {
            throw error;
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId) => {
        try {
            const response = await deleteProductApi(productId);
            console.log('response: ', response)
            return response;
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

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async ({name, sku, price, description, inventory, categories, active}) => {
        try {
            const response = await createProductApi(name, sku, price, description, inventory, categories, active);
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
);

export const setAssetsForProduct = createAsyncThunk(
    "products/setAssetsForProduct",
    async ({productId, assets}) => {
        try {
            const response = await setAssetsForProductApi(productId, assets);
            console.log('set asset for product ', response);
            return response?.data;
        } catch(error) {
            console.log(error)
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


            .addCase(fetchProductVariants.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.productVariants = [];
            })
            .addCase(fetchProductVariants.fulfilled, (state, action) => {
                state.loading = false;
                state.productVariants = action.payload?.data;
            })
            .addCase(fetchProductVariants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
                state.createStatus = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
                state.createStatus = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload?.data;
                state.createStatus = action.payload.status;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.createStatus = action.payload.status;
            })

            .addCase(setAssetsForProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setAssetsForProduct.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(setAssetsForProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.deleteStatus = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteStatus = action.payload?.status;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteStatus = null;
            })
    },
});

export default productSlice.reducer;
