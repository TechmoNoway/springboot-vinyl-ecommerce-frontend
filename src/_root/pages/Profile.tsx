import React from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const Profile: React.FC = () => {
  const { currentUser, isAdmin, logoutWithNavigate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const menuItems = [
    {
      label: "Thông Tin Tài Khoản",
      path: "/account/details",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "Lịch Sử Đơn Hàng",
      path: "/account/orders",
      icon: <Package className="w-4 h-4" />,
    },
    {
      label: "Đĩa Than Yêu Thích",
      path: "/account/wishlist",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      label: "Địa Chỉ Nhận Hàng",
      path: "/account/addresses",
      icon: <MapPin className="w-4 h-4" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header Greeting */}
      <div className="bg-[#13151A] text-white p-6 sm:p-8 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-black font-black text-xl shadow-md border-2 border-amber-400">
            {currentUser?.fullname ? currentUser.fullname.charAt(0).toUpperCase() : "V"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-display text-white">
                {currentUser?.fullname || "Người yêu đĩa than"}
              </h1>
              {isAdmin && (
                <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{currentUser?.email}</p>
          </div>
        </div>

        {isAdmin && (
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-4 py-2.5 rounded-none font-bold text-xs uppercase shadow-retro-sm transition-transform active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Mở Trang Quản Trị</span>
          </Link>
        )}
      </div>

      {/* Main 2-Column: Navigation Menu + Content Outlet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Sidebar Menu */}
        <div className="lg:col-span-3 bg-white border-2 border-zinc-900 rounded-lg p-4 shadow-retro">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all text-left ${
                    isActive
                      ? "bg-[#13151A] text-amber-400 shadow-retro-sm"
                      : "hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900"
                  }`}
                >
                  <span className={isActive ? "text-amber-400" : "text-zinc-500"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {isAdmin && (
              <Link
                to="/admin"
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-none text-xs font-bold uppercase tracking-wider text-amber-600 hover:bg-amber-50 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Bảng Quản Trị Admin</span>
              </Link>
            )}

            <button
              onClick={logoutWithNavigate}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-none text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 transition-colors pt-4 border-t border-zinc-200 mt-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng Xuất</span>
            </button>
          </nav>
        </div>

        {/* Right: Content Area without stuck AnimatePresence */}
        <div className="lg:col-span-9 bg-white border-2 border-zinc-900 rounded-lg p-6 sm:p-8 shadow-retro min-h-[480px]">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default Profile;
