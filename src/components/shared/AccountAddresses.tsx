import React from "react";
import { useAuth } from "@/context/AuthContext";
import { MapPin, CheckCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const AccountAddresses: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold font-display uppercase tracking-tight text-zinc-900">
            Địa Chỉ Giao Hàng
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default Shipping Address Card */}
        <div className="bg-white border-2 border-zinc-900 rounded-lg p-5 shadow-retro space-y-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-sm text-zinc-900">
                Địa Chỉ Mặc Định
              </span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Mặc định
            </span>
          </div>

          <div className="text-xs text-zinc-600 space-y-1">
            <p className="font-bold text-zinc-900 text-sm">
              {currentUser.fullname || "Chưa cập nhật tên"}
            </p>
            <p>Số điện thoại: {currentUser.phone || "Chưa cập nhật"}</p>
            <p className="leading-relaxed">
              Địa chỉ: {currentUser.address || "Chưa thiết lập địa chỉ mặc định"}
            </p>
          </div>

          <div className="pt-2 border-t border-zinc-200">
            <Link
              to="/account/details"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 uppercase"
            >
              Chỉnh sửa thông tin địa chỉ &gt;
            </Link>
          </div>
        </div>

        {/* Note / Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 space-y-2 text-xs text-amber-900 flex flex-col justify-center">
          <p className="font-bold text-sm text-amber-950">
            📦 Lưu ý khi nhận đĩa than:
          </p>
          <p className="leading-relaxed">
            Vọc Records luôn đóng gói đĩa than bằng thùng carton 3 lớp chuyên dụng và bọc bóng khí chống sốc tiêu chuẩn quốc tế. Vui lòng kiểm tra kỹ bưu phẩm trước khi thanh toán cho shipper nhé!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountAddresses;
