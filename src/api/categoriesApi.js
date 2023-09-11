import { instance } from './commerceApi';

export const fetchCategoriesApi = async (depth, parent_id, include) => {
    try {
        const response = await instance.get('/categories', {
            params: {
                depth, parent_id, include,
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}