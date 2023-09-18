import { instance } from './commerceApi';

export const createNewAssetApi = async (filename, contents, url, meta) => {
    try {
        const response = await instance.post('/assets', {
            filename, contents, url, meta
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteAssetApi = async (assetId) => {
    try {
        const response = await instance.delete(`/assets/${assetId}`);
        return response;
    } catch (error) {
        throw error;
    }
}