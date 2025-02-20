import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: apiBaseUrl });

export const getAllCategories = () => {
    try {
        const res = API.get(`api/v1/categories/getAllCategories`);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};
