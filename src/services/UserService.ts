import axios from "axios";
import { IChangePassword, IUpdateUser } from "types";

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

export const getAllUsers = () => {
  try {
    const res = API.get(`api/v1/users`);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCurrentUser = (id: number) => {
  try {
    const res = API.get(`api/v1/users?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserByEmail = (email: string) => {
  try {
    const res = API.get(`api/v1/users/email?address=${email}`);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserInfo = (userForm: IUpdateUser) => {
  try {
    const res = API.put(`api/v1/users/update`, userForm);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const changePassword = (password: IChangePassword) => {
  try {
    const res = API.put(`api/v1/users/change-password`, password);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
