import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setUser, logout as logoutAction, AuthState } from "../redux/authSlice";
import { getCurrentUserProfile } from "@/services/UserService";
import { useToast } from "@/hooks/use-toast";
import { getStoredToken, setStoredToken, removeStoredToken } from "@/services/apiClient";
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
  stateLogin: (token: string) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  logoutWithNavigate: () => void;
  logoutWithoutNavigate: () => void;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getStoredToken());
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
      if (userData) {
        let roles: string[] = [];
        if (Array.isArray(userData.roles)) {
          roles = userData.roles.map((r: unknown) => (typeof r === "string" ? r : (r as { name?: string }).name || ""));
        } else if (typeof userData.role === "string") {
          roles = [userData.role];
        }

        const roleStr = roles.join(",");
        dispatch(
          setUser({
            id: userData.id,
            email: userData.email || "",
            phone: userData.phone || "",
            gender: userData.gender || "",
            fullname: userData.fullname || "",
            birthday: userData.birthday,
            address: userData.address || "",
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
    const rawToken = getStoredToken();
    if (!rawToken) {
      dispatch(logoutAction());
      setIsLoading(false);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(rawToken);
      const currentUnix = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentUnix) {
        removeStoredToken();
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
      console.error("Token decoding error:", e);
      removeStoredToken();
      setToken(null);
      dispatch(logoutAction());
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, fetchProfile, toast]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const stateLogin = async (newToken: string) => {
    const cleanToken = newToken.replace(/^"|"$/g, "");
    setStoredToken(cleanToken);
    setToken(cleanToken);
    await fetchProfile();
  };

  const loginWithGoogle = async (newToken: string) => {
    await stateLogin(newToken);
  };

  const logoutWithoutNavigate = () => {
    removeStoredToken();
    setToken(null);
    dispatch(logoutAction());
  };

  const logoutWithNavigate = () => {
    logoutWithoutNavigate();
    if (location.pathname.startsWith("/account") || location.pathname.startsWith("/admin")) {
      navigate("/login-signup");
    }
  };

  const isAdmin = Boolean(
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
