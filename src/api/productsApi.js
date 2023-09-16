import { instance } from './commerceApi';

export const fetchProductsApi = 
async (limit, page, sortBy, sortDirection, category_id, query) => {
    try {
        const response = await instance.get('/products', {
            params: {
                limit, page, sortBy, sortDirection, category_id, query
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchProductApi = 
async (product_id) => {
    try {
        const response = await instance.get(`/products/${product_id}`);
        return response;
    } catch (error) {
        throw error;
    }
}