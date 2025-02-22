import React from "react";

const Profile = () => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-10">
      <div className="flex w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {/* Sidebar */}
        <div className="w-1/3 border-r pr-6">
          <h2 className="font-semibold text-gray-700 mb-4">
            THÔNG TIN TÀI KHOẢN
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-black cursor-pointer">
              WISHLIST
            </li>
            <li className="hover:text-black cursor-pointer">
              THEO DÕI ĐƠN HÀNG
            </li>
            <li className="hover:text-black cursor-pointer">
              ĐỊA CHỈ NHẬN HÀNG
            </li>
            <li className="hover:text-black cursor-pointer font-semibold">
              THOÁT
            </li>
          </ul>
        </div>

        {/* Profile Form */}
        <div className="w-2/3 pl-6">
          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
              />
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium">
              Tên hiển thị *
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
            />
            <p className="text-xs text-gray-500 italic">
              Tên này sẽ hiển thị trong trang Tài khoản và phần Đánh
              giá sản phẩm
            </p>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
            />
          </div>

          {/* Password Change Section */}
          <h3 className="font-semibold text-gray-700 mt-6 mb-2">
            PASSWORD CHANGE
          </h3>

          <div>
            <label className="block text-sm font-medium">
              Current Password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              New Password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
            />
          </div>

          {/* Save Button */}
          <button className="bg-black text-white py-2 px-6 rounded-md">
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
