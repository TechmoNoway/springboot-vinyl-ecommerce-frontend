import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: apiBaseUrl });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`;
    }
    return req;
});

export const getAllUsers = () => {
    try {
        const res = API.get(`api/v1/users/getAllUsers`);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getCurrentUser = (id: number) => {
    try {
        const res = API.get(`api/v1/users/getUserById?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// export const updateUser = (userform: IUpdateUser) => {
//     try {
//         const res = API.put(`api/v1/users/updateUser`, userform);
//         return res;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// };
