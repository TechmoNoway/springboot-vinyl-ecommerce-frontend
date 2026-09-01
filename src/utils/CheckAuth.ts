import { jwtDecode } from "jwt-decode";
import { getStoredToken } from "@/services/apiClient";

interface DecodedToken {
  exp?: number;
  sub?: string;
  roles?: string[];
  role?: string;
}

export const checkIsTokenValid = (): boolean => {
  const token = getStoredToken();
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    const currentUnix = Math.floor(Date.now() / 1000);
    return Boolean(decoded.exp && decoded.exp > currentUnix);
  } catch {
    return false;
  }
};
