import axios from "axios";
import { IGoogleLoginForm, ILoginForm } from "types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: apiBaseUrl });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token") ?? ""
    )}`;
  }
  return req;
});

export const login = (userForm: ILoginForm) => {
  try {
    const res = API.post("api/v1/auth/login", userForm);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const register = (email: string) => {
  try {
    const res = API.post(`api/v1/auth/register?email=${email}`);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginUsingGoogle = (userForm: IGoogleLoginForm) => {
  try {
    const res = API.post("api/v1/auth/loginWithGoogle", userForm);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
