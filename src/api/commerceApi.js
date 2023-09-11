import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://api.chec.io/v1',
    timeout: 15000,
    headers: {'X-Authorization': 'sk_test_53857bf5420cb54f5212ba4612b965baf0ed4e1dacc2c'}
});