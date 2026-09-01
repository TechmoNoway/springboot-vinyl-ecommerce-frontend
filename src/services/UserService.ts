import apiClient from "./apiClient";
import { IChangePassword, IUpdateUser } from "types";

// User endpoints
export const getCurrentUserProfile = async () => {
  try {
    const res = await apiClient.get("/api/v1/users/me");
    return res;
  } catch (error) {
    console.error("UserService.getCurrentUserProfile error:", error);
    throw error;
  }
};

export const updateUserInfo = async (userForm: IUpdateUser) => {
  try {
    const res = await apiClient.put("/api/v1/users/profile", userForm);
    return res;
  } catch (error) {
    console.error("UserService.updateUserInfo error:", error);
    throw error;
  }
};

export const changePassword = async (passwordForm: IChangePassword) => {
  try {
    const res = await apiClient.put("/api/v1/users/change-password", passwordForm);
    return res;
  } catch (error) {
    console.error("UserService.changePassword error:", error);
    throw error;
  }
};

// Admin endpoints
export const getAllUsers = async () => {
  try {
    const res = await apiClient.get("/api/v1/users");
    return res;
  } catch (error) {
    console.error("UserService.getAllUsers error:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const res = await apiClient.get(
      `/api/v1/users/email?address=${encodeURIComponent(email)}`
    );
    return res;
  } catch (error) {
    console.error("UserService.getUserByEmail error:", error);
    throw error;
  }
};

export const getUserById = async (id: number | string) => {
  try {
    const res = await apiClient.get(`/api/v1/users/${id}`);
    return res;
  } catch (error) {
    console.error("UserService.getUserById error:", error);
    throw error;
  }
};
