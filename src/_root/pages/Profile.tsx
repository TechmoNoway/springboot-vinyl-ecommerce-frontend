import { useAuth } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const { logoutWithNavigate } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutWithNavigate();
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-10">
      <div className="flex w-full h-full max-w-[90rem] bg-white shadow-md rounded-lg p-6">
        <div className="w-1/5 border-r pr-6">
          <ul className="text-gray-600">
            <li
              onClick={() => navigate("/account/details")}
              className={
                "text-gray-700 cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2 " +
                `${
                  window.location.pathname === "/account/details" &&
                  "font-semibold"
                }`
              }
            >
              THÔNG TIN TÀI KHOẢN
            </li>
            <li
              onClick={() => navigate("/account/wishlist")}
              className={
                "text-gray-700 cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2 " +
                `${
                  window.location.pathname === "/account/wishlist" &&
                  "font-semibold"
                }`
              }
            >
              WISHLIST
            </li>
            <li
              onClick={() => navigate("/account/orders")}
              className={
                "text-gray-700 cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2 " +
                `${
                  window.location.pathname === "/account/orders" &&
                  "font-semibold"
                }`
              }
            >
              THEO DÕI ĐƠN HÀNG
            </li>
            <li
              onClick={() => navigate("/account/addresses")}
              className={
                "text-gray-700 cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2 " +
                `${
                  window.location.pathname === "/account/addresses" &&
                  "font-semibold"
                }`
              }
            >
              ĐỊA CHỈ NHẬN HÀNG
            </li>
            <li
              onClick={handleLogout}
              className="hover:text-black cursor-pointer py-4 hover:bg-zinc-200 px-2"
            >
              THOÁT
            </li>
          </ul>
        </div>

        {/* Profile Form */}
        <div className="w-4/5 pl-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
