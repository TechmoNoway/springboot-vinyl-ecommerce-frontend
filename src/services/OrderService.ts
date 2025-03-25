import axios from "axios";
import { IOrder } from "types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: apiBaseUrl });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access_token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("access_token") ?? ""
    )}`;
  }
  return req;
});

export const placeOrder = (orderForm: IOrder) => {
  try {
    const res = API.post(`api/v1/orders/place-order`, orderForm);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getOrders = (userId: number) => {
  try {
    const res = API.get(`api/v1/orders/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
