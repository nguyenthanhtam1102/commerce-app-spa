import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    createNewAssetApi,
    deleteAssetApi,
} from "../../api/assetsApi";

const initState = {
    asset: null,
    loading: false,
    error: null,
    status: null,
};

export const createNewAsset = createAsyncThunk(
    "assets/createNewAsset",
    async ({filename, contents, url, meta}) => {
        try {
            const response = await createNewAssetApi(filename, contents, url, meta);
            return response;
        } catch(error) {
            throw error;
        }
    }
);

export const deleteAsset = createAsyncThunk(
    "assets/deleteAsset",
    async (assetId) => {
        try {
            const response = await deleteAssetApi(assetId);
            console.log(response);
            return response;
        } catch(error) {
            throw error;
        }
    }
);

const assetsSlice = createSlice({
    name: "assets",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewAsset.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.status = null;
                state.asset = null;
            })
            .addCase(createNewAsset.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action.payload.status;
                state.asset = action.payload.data;
            })
            .addCase(createNewAsset.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteAsset.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.status = null;
            })
            .addCase(deleteAsset.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action.payload.status;
            })
            .addCase(deleteAsset.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default assetsSlice.reducer;
