import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "@/services/AuthService";
import { useToast } from "@/hooks/use-toast";
import { Disc3, Mail, ArrowLeft, Send } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      await register(email.trim());
      toast({
        title: "Đã gửi hướng dẫn!",
        description: "Mật khẩu mới đã được gửi tới hộp thư của bạn.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra",
        description: "Vui lòng kiểm tra lại địa chỉ email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white border-2 border-zinc-900 rounded-2xl p-8 shadow-retro-lg space-y-6">
        
        <div className="text-center space-y-2">
          <Disc3 className="w-10 h-10 text-amber-500 mx-auto animate-spin-slow" />
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-zinc-900">
            Khôi Phục Mật Khẩu
          </h1>
          <p className="text-xs text-zinc-500">
            Nhập địa chỉ email đăng ký để nhận lại mật khẩu đăng nhập vào tiệm.
          </p>
        </div>

        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
              Địa Chỉ Email Của Bạn
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2.5 text-xs text-zinc-900 focus:border-amber-400 focus:bg-white focus:outline-none"
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#13151A] hover:bg-black text-amber-300 py-3 px-4 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-black shadow-retro-sm transition-transform active:scale-[0.99]"
          >
            {loading ? (
              <ClipLoader size={16} color="#F5C542" />
            ) : (
              <>
                <span>GỬI MẬT KHẨU MỚI</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-zinc-200">
          <Link
            to="/login-signup"
            className="text-xs font-bold text-zinc-600 hover:text-black flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại đăng nhập</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
