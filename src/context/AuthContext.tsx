import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { setUser, logout as logoutAction } from "../redux/authSlice";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/services/UserService";

interface AuthContextProps {
  //TODO: Define the type of currentUser
  currentUser: unknown;
  token: string | null;
  login: (token: string) => void;
  loginWithGoogle: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<unknown>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        if (location.pathname !== "/checkout") {
          console.log();
        }
      } else {
        interface DecodedToken {
          exp: number;
          sub: string;
        }
        const decodedToken: DecodedToken =
          jwtDecode<DecodedToken>(token);
        console.log(decodedToken.exp);
        console.log(decodedToken.sub);

        const currentUnixTimestamp = Math.floor(Date.now() / 1000);

        console.log(currentUnixTimestamp);

        if (
          decodedToken.exp &&
          decodedToken.exp > currentUnixTimestamp
        ) {
          const userdetailResponse = await getCurrentUser(
            parseInt(decodedToken.sub as string)
          );

          if (userdetailResponse?.data.data) {
            const currentUserInfo = userdetailResponse.data.data;

            localStorage.setItem(
              "info",
              JSON.stringify(currentUserInfo.id)
            );

            dispatch(setUser(currentUserInfo));
            setCurrentUser(currentUserInfo);
          }
        } else {
          dispatch(logoutAction());
          if (location.pathname !== "/sign-in") {
            localStorage.removeItem("token");
            localStorage.removeItem("info");
            localStorage.removeItem("persist:root");
            toast({
              variant: "destructive",
              title: "Opps! Your last login session expired",
              description: "Please login again.",
            });
            navigate("/sign-in");
          }
        }
      }
    };

    checkAuth();
  }, [token, dispatch, navigate, location]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const loginWithGoogle = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("info");
    localStorage.removeItem("persist:root");
    setToken(null);
    setCurrentUser(null);
    dispatch(logoutAction());
    navigate("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, token, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
