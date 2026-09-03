import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4242";

export const getStoredAccessToken = (): string | null => {
  const token = localStorage.getItem("access_token") || localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(token);
  } catch {
    return token;
  }
};

export const getStoredRefreshToken = (): string | null => {
  const token = localStorage.getItem("refresh_token");
  if (!token) return null;
  try {
    return JSON.parse(token);
  } catch {
    return token;
  }
};

// Backward-compatibility alias
export const getStoredToken = getStoredAccessToken;

export const setStoredTokens = (accessToken: string, refreshToken?: string) => {
  const cleanAccess = accessToken.replace(/^"|"$/g, "");
  localStorage.setItem("access_token", cleanAccess);
  if (refreshToken) {
    const cleanRefresh = refreshToken.replace(/^"|"$/g, "");
    localStorage.setItem("refresh_token", cleanRefresh);
  }
};

// Backward-compatibility alias
export const setStoredToken = (accessToken: string) => {
  setStoredTokens(accessToken);
};

export const removeStoredTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token");
  localStorage.removeItem("info");
  localStorage.removeItem("persist:root");
};

// Backward-compatibility alias
export const removeStoredToken = removeStoredTokens;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Attach Bearer <accessToken>
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoredAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Handle responses & refresh token
apiClient.interceptors.response.use(
  (response) => {
    // Check if backend returned HTTP 200 with { success: false }
    if (
      response.data &&
      typeof response.data === "object" &&
      response.data.success === false
    ) {
      const errorMessage =
        response.data.message || response.data.error || "Thao tác không thành công";
      const customErr = new Error(errorMessage);
      (customErr as unknown as { response: typeof response; isBusinessError: boolean }).response = response;
      (customErr as unknown as { isBusinessError: boolean }).isBusinessError = true;
      return Promise.reject(customErr);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const requestUrl = originalRequest?.url || "";
    const isAuthRoute =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh-token");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getStoredRefreshToken();
        if (refreshToken) {
          // POST /api/v1/auth/refresh-token
          // Authorization: Bearer <refreshToken>
          // No body
          const res = await axios.post(
            `${API_BASE_URL}/api/v1/auth/refresh-token`,
            null,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const resData = res.data?.data || res.data;
          const newAccessToken = resData?.accessToken;
          const newRefreshToken = resData?.refreshToken || refreshToken;

          if (newAccessToken) {
            setStoredTokens(newAccessToken, newRefreshToken);
            processQueue(null, newAccessToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return apiClient(originalRequest);
          }
        }
      } catch (refreshErr) {
        processQueue(refreshErr as Error, null);
        removeStoredTokens();
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
