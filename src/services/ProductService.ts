import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: apiBaseUrl });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('token')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`;
//     }
//     return req;
// });

export const getReadyProducts = () => {
  try {
    const res = API.get(`api/v1/products/ready`);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProductByTitle = (title: string) => {
  try {
    const res = API.get(`api/v1/products/title?title=${title}`);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const searchProductsByTitle = (title: string) => {
  try {
    const res = API.get(`api/v1/products/search?title=${title}`);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllProductsFilteredAndSorted = (
  title: string | null,
  category: string | null,
  platform: string | null,
  stockStatus: string | null,
  studioName: string | null,
  manufactureYear: string | null,
  status: string | null,
  sortType: string | "DEFAULT"
) => {
  try {
    const res = API.get(
      `api/v1/products?title=${title}&category=${category}&platform=${platform}&stockStatus=${stockStatus}&studioName=${studioName}&manufactureYear=${manufactureYear}&status=${status}&sortType=${sortType}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
