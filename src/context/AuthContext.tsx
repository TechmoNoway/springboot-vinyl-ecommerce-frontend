import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setUser, logout as logoutAction, AuthState } from "../redux/authSlice";
import { getCurrentUserProfile } from "@/services/UserService";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  API_BASE_URL,
  getStoredAccessToken,
  getStoredRefreshToken,
  setStoredTokens,
  removeStoredTokens,
} from "@/services/apiClient";
import { ICurrentUser } from "types";

interface DecodedToken {
  exp?: number;
  sub?: string;
  roles?: string[] | string;
  role?: string;
  authorities?: string[] | string;
}

interface AuthContextProps {
  currentUser: AuthState;
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  stateLogin: (
    accessToken: string,
    refreshToken?: string,
    initialData?: Partial<AuthState>
  ) => Promise<void>;
  loginWithGoogle: (accessToken: string) => Promise<void>;
  logoutWithNavigate: () => void;
  logoutWithoutNavigate: () => void;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getStoredAccessToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const authState = useSelector((state: ICurrentUser) => state.auth as AuthState);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await getCurrentUserProfile();
      const userData = res?.data?.data || res?.data;
      if (userData && userData.email) {
        const roleId = userData.roleId;
        const isAdminUser = roleId === 1;
        const roleStr = isAdminUser ? "ADMIN" : "CUSTOMER";
        const roles = isAdminUser
          ? ["ROLE_ADMIN", "ADMIN"]
          : ["ROLE_CUSTOMER", "CUSTOMER"];

        dispatch(
          setUser({
            id: userData.id,
            email: userData.email || "",
            phone: userData.phone || "",
            gender: userData.gender || "",
            fullname: userData.fullname || "",
            birthday: userData.birthday,
            address: userData.address || "",
            roleId: roleId,
            avatar: userData.avatar || "",
            roles: roles,
            role: roleStr,
          })
        );
      }
    } catch (err) {
      console.warn("Failed to fetch /api/v1/users/me profile:", err);
    }
  }, [dispatch]);

  const checkAuth = useCallback(async () => {
    const rawToken = getStoredAccessToken();
    if (!rawToken) {
      dispatch(logoutAction());
      setIsLoading(false);
      return;
    }

    try {
      let isExpired = false;
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(rawToken);
        const currentUnix = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentUnix) {
          isExpired = true;
        }
      } catch {
        // If jwtDecode fails, token might not be standard JWT, continue
      }

      if (isExpired) {
        const rToken = getStoredRefreshToken();
        if (rToken) {
          try {
            const refreshRes = await axios.post(
              `${API_BASE_URL}/api/v1/auth/refresh-token`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${rToken}`,
                },
              }
            );
            const rData = refreshRes.data?.data || refreshRes.data;
            if (rData?.accessToken) {
              setStoredTokens(rData.accessToken, rData.refreshToken || rToken);
              setToken(rData.accessToken);
              await fetchProfile();
              setIsLoading(false);
              return;
            }
          } catch {
            // Refresh failed, proceed to logout
          }
        }

        removeStoredTokens();
        setToken(null);
        dispatch(logoutAction());
        toast({
          variant: "destructive",
          title: "Phiên đăng nhập đã hết hạn",
          description: "Vui lòng đăng nhập lại để tiếp tục.",
        });
        setIsLoading(false);
        return;
      }

      setToken(rawToken);
      await fetchProfile();
    } catch (e) {
      console.error("Token checking error:", e);
      removeStoredTokens();
      setToken(null);
      dispatch(logoutAction());
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, fetchProfile, toast]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const stateLogin = async (
    accessToken: string,
    refreshToken?: string,
    initialData?: Partial<AuthState>
  ) => {
    const cleanToken = accessToken.replace(/^"|"$/g, "");
    setStoredTokens(cleanToken, refreshToken);
    setToken(cleanToken);

    if (initialData && (initialData.email || initialData.id)) {
      dispatch(setUser(initialData));
    }

    await fetchProfile();
  };

  const loginWithGoogle = async (accessToken: string) => {
    await stateLogin(accessToken);
  };

  const logoutWithoutNavigate = () => {
    removeStoredTokens();
    setToken(null);
    dispatch(logoutAction());
  };

  const logoutWithNavigate = () => {
    logoutWithoutNavigate();
    if (
      location.pathname.startsWith("/account") ||
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/checkout")
    ) {
      navigate("/login-signup");
    }
  };

  const isAdmin = Boolean(
    authState?.roleId === 1 ||
    authState?.roles?.some((r) => r.toLowerCase().includes("admin")) ||
    authState?.role?.toLowerCase().includes("admin") ||
    authState?.email?.toLowerCase().includes("admin")
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser: authState,
        token,
        isAdmin,
        isLoading,
        stateLogin,
        loginWithGoogle,
        logoutWithNavigate,
        logoutWithoutNavigate,
        refreshUserProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
