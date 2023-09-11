import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchCategoriesApi } from "../../api/categoriesApi";

const initState = {
    categories: [],
    pagination: null,
    loading: false,
    error: false,
};

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async ({ depth, parent_id, include }) => {
        try {
            const response = await fetchCategoriesApi(depth, parent_id, include);
            return response?.data;
        } catch(error) {
            throw error;
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload?.data;
                state.pagination = action.payload?.meta.pagination;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default categoriesSlice.reducer;
