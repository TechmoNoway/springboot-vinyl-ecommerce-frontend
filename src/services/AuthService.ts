import apiClient, { getStoredRefreshToken } from "./apiClient";
import { IGoogleLoginForm, ILoginForm } from "types";

export const login = async (userForm: ILoginForm) => {
  try {
    const res = await apiClient.post("/api/v1/auth/login", userForm);
    return res;
  } catch (error) {
    console.error("AuthService.login error:", error);
    throw error;
  }
};

export const googleLogin = async (userForm: IGoogleLoginForm) => {
  try {
    const res = await apiClient.post("/api/v1/auth/google-login", userForm);
    return res;
  } catch (error) {
    console.error("AuthService.googleLogin error:", error);
    throw error;
  }
};

export const register = async (email: string) => {
  try {
    const res = await apiClient.post(
      `/api/v1/auth/register?email=${encodeURIComponent(email)}`
    );
    return res;
  } catch (error) {
    console.error("AuthService.register error:", error);
    throw error;
  }
};

export const refreshToken = async (overrideRefreshToken?: string) => {
  try {
    const token = overrideRefreshToken || getStoredRefreshToken();
    const res = await apiClient.post("/api/v1/auth/refresh-token", null, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res;
  } catch (error) {
    console.error("AuthService.refreshToken error:", error);
    throw error;
  }
};
