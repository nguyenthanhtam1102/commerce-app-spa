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

export const deleteProductApi = 
async (productId) => {
    try {
        const response = await instance.delete(`/products/${productId}`);
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

export const fetchProductVariantsApi = async (productId) => {
    try {
        const response = await instance.get(`/products/${productId}/variants`);
        return response;
    } catch(ex) {
        throw ex;
    }
}

export const createProductApi = async (name, sku, price, description, inventory, categories, active) => {
    try {
        const response = await instance.post('/products', {
            product: {
                name, sku, price, description, 
                inventory: {
                    managed: true,
                    available: inventory
                },
                categories: ['cat_0YnEoqg61le7P6'],
                active
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const setAssetsForProductApi = async (productId, assets) => {
    try {
        const response = await instance.put(`/products/${productId}/assets`, {
            assets
        });
        return response;
    } catch (error) {
        throw error;
    }
}