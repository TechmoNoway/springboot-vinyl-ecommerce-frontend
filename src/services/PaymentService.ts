import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: apiBaseUrl });

export const createQRPayment = (amount: string) => {
  try {
    const res = API.post(
      `api/v1/payments/generate-vietqr?amount=${amount}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
