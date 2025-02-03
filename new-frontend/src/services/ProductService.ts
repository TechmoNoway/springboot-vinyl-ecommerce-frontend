import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: apiBaseUrl });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('token')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`;
//     }
//     return req;
// });

export const getAllProducts = () => {
    try {
        const res = API.get(`api/v1/products/getAllProducts`);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getReadyProducts = () => {
    try {
        const res = API.get(`api/v1/products/getReadyProducts`);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getProductByTitle = (title: string) => {
    try {
        const res = API.get(`api/v1/products/getProductByTitle?title=${title}`);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};
