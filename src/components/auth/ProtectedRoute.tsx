import React, { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ClipLoader from "react-spinners/ClipLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { token, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const hasNotified = useRef(false);

  useEffect(() => {
    if (!isLoading && !token && !hasNotified.current) {
      hasNotified.current = true;
      toast({
        variant: "destructive",
        title: "Yêu cầu đăng nhập 🔒",
        description: "Vui lòng đăng nhập để tiếp tục thanh toán và thực hiện thao tác này.",
      });
    }
  }, [isLoading, token, toast]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <ClipLoader size={36} color="#E5A93C" />
        <p className="text-xs font-semibold text-zinc-500">Đang xác thực bảo mật...</p>
      </div>
    );
  }

  // Not logged in -> Redirect to login with intended destination
  if (!token) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return (
      <Navigate
        to={`/login-signup?redirect=${returnUrl}`}
        state={{ from: location }}
        replace
      />
    );
  }

  // Admin route protection
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
