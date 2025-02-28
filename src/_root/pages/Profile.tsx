import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/UserService";

interface RootState {
  auth: {
    id: number;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    fullname: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  };
}

const Profile = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<IUser>({});
  const currentUser = useSelector((state: RootState) => state.auth);

  const { logout, updateUser } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const hanldeUpdateUser = () => {};

  console.log(currentUser);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-10">
      <div className="flex w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {/* Sidebar */}
        <div className="w-1/3 border-r pr-6">
          <ul className="text-gray-600">
            <li className="font-semibold text-gray-700 cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2">
              THÔNG TIN TÀI KHOẢN
            </li>
            <li className="hover:text-black cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2">
              WISHLIST
            </li>
            <li className="hover:text-black cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2">
              THEO DÕI ĐƠN HÀNG
            </li>
            <li className="hover:text-black cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2">
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
        <div className="w-2/3 pl-6">
          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Fullname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentUser.fullname}
                className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">
              Address *
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              value={currentUser.email}
              type="email"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
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
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              New Password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
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
