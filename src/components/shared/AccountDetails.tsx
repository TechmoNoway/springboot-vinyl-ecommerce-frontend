import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateUserInfo, changePassword } from "@/services/UserService";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Save, ShieldCheck } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const AccountDetails: React.FC = () => {
  const { currentUser, refreshUserProfile } = useAuth();
  const { toast } = useToast();

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "Male",
    address: "",
    birthday: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        fullname: currentUser.fullname || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        gender: currentUser.gender || "Male",
        address: currentUser.address || "",
        birthday: currentUser.birthday
          ? new Date(currentUser.birthday).toISOString().split("T")[0]
          : "",
      });
    }
  }, [currentUser]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      await updateUserInfo({
        fullname: profileForm.fullname,
        phone: profileForm.phone,
        gender: profileForm.gender,
        address: profileForm.address,
        birthday: profileForm.birthday ? new Date(profileForm.birthday) : undefined,
      });
      await refreshUserProfile();
      toast({
        title: "Cập nhật thành công!",
        description: "Thông tin hồ sơ của bạn đã được lưu lại.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Cập nhật thất bại",
        description: "Vui lòng kiểm tra lại thông tin và thử lại.",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      toast({
        variant: "destructive",
        title: "Mật khẩu không khớp",
        description: "Mật khẩu mới và xác nhận mật khẩu phải giống nhau.",
      });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Mật khẩu quá ngắn",
        description: "Mật khẩu mới phải có ít nhất 6 ký tự.",
      });
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast({
        title: "Đổi mật khẩu thành công!",
        description: "Mật khẩu tài khoản của bạn đã được cập nhật.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Đổi mật khẩu thất bại",
        description: "Mật khẩu hiện tại không chính xác.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Profile Form */}
      <div>
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 mb-6">
          <User className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold font-display uppercase tracking-tight text-zinc-900">
            Thông Tin Cá Nhân
          </h2>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Họ và Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={profileForm.fullname}
                onChange={(e) => setProfileForm({ ...profileForm, fullname: e.target.value })}
                className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Địa Chỉ Email
              </label>
              <input
                type="email"
                disabled
                value={profileForm.email}
                className="w-full bg-zinc-100 border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Số Điện Thoại
              </label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                placeholder="0901234567"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Giới Tính
              </label>
              <select
                value={profileForm.gender}
                onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
              >
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Ngày Sinh
              </label>
              <input
                type="date"
                value={profileForm.birthday}
                onChange={(e) => setProfileForm({ ...profileForm, birthday: e.target.value })}
                className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Địa Chỉ Giao Hàng Mặc Định
            </label>
            <input
              type="text"
              value={profileForm.address}
              onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
              className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
            />
          </div>

          <button
            type="submit"
            disabled={profileLoading}
            className="bg-[#13151A] hover:bg-black text-amber-400 font-extrabold text-xs uppercase px-6 py-3 rounded-none shadow-retro-sm transition-transform active:scale-95 flex items-center gap-2 border border-black"
          >
            {profileLoading ? (
              <ClipLoader size={16} color="#F5C542" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Lưu Thay Đổi Hồ Sơ</span>
          </button>
        </form>
      </div>

      {/* Password Change Form */}
      <div className="pt-6 border-t border-zinc-200">
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 mb-6">
          <Lock className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold font-display uppercase tracking-tight text-zinc-900">
            Bảo Mật & Đổi Mật Khẩu
          </h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Mật Khẩu Hiện Tại <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Mật Khẩu Mới (Tối thiểu 6 ký tự) <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Xác Nhận Mật Khẩu Mới <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={passwordForm.confirmNewPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
              className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="bg-[#13151A] hover:bg-black text-amber-400 font-extrabold text-xs uppercase px-6 py-3 rounded-none shadow-retro-sm transition-transform active:scale-95 flex items-center gap-2 border border-black"
          >
            {passwordLoading ? (
              <ClipLoader size={16} color="#F5C542" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            <span>Cập Nhật Mật Khẩu</span>
          </button>
        </form>
      </div>

    </div>
  );
};

export default AccountDetails;
