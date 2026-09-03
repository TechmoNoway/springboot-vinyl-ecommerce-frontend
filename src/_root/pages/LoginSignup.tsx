import React, { useState } from "react";
import { useNavigate, Link, useSearchParams, useLocation } from "react-router-dom";
import { login, register, googleLogin } from "@/services/AuthService";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";
import {
  Disc3,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

const LoginSignup: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isLoginTab, setIsLoginTab] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const redirectTarget = searchParams.get("redirect") || (location.state as { from?: { pathname?: string } })?.from?.pathname || "/account/details";

  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  // Register form state
  const [regEmail, setRegEmail] = useState<string>("");

  const { stateLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin đăng nhập",
        description: "Vui lòng nhập đầy đủ email và mật khẩu.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await login({
        email: loginEmail.trim(),
        password: loginPassword.trim(),
      });

      if (res?.data && res.data.success === false) {
        throw new Error(res.data.message || res.data.error || "Đăng nhập thất bại");
      }

      const authData = res?.data?.data || res?.data;
      const accessToken =
        authData?.accessToken ||
        authData?.token ||
        (typeof authData === "string" ? authData : null);
      const refreshToken = authData?.refreshToken;

      if (!accessToken) {
        throw new Error(res?.data?.message || "Không nhận được access token từ máy chủ");
      }

      await stateLogin(accessToken, refreshToken, {
        id: authData?.userID || authData?.id,
        email: authData?.email || loginEmail.trim(),
        fullname: authData?.fullname || "",
        roleId: authData?.roleId,
        avatar: authData?.avatar,
      });

      toast({
        title: "Đăng nhập thành công! 🎉",
        description: `Chào mừng ${authData?.fullname || loginEmail.trim()} quay trở lại với 33 RPM.`,
      });
      navigate(redirectTarget);
    } catch (err: unknown) {
      console.error("Login failed:", err);
      const anyErr = err as { response?: { data?: { message?: string; error?: string } }; message?: string };
      const errorMessage =
        anyErr?.response?.data?.message ||
        anyErr?.response?.data?.error ||
        anyErr?.message ||
        "Email hoặc mật khẩu không chính xác. Vui lòng thử lại.";
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim()) {
      toast({
        variant: "destructive",
        title: "Thiếu email",
        description: "Vui lòng nhập địa chỉ email để đăng ký tài khoản.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await register(regEmail.trim());
      if (res?.data && res.data.success === false) {
        throw new Error(res.data.message || res.data.error || "Đăng ký không thành công.");
      }

      const authData = res?.data?.data || res?.data;
      const accessToken = authData?.accessToken;
      const refreshToken = authData?.refreshToken;

      toast({
        title: "Đăng ký thành công! 🎉",
        description: "Mật khẩu tạm thời đã được gửi tới email của bạn.",
      });

      if (accessToken) {
        await stateLogin(accessToken, refreshToken, {
          email: regEmail.trim(),
        });
        navigate(redirectTarget);
      } else {
        setIsLoginTab(true);
        setLoginEmail(regEmail.trim());
      }
    } catch (err: unknown) {
      console.error("Register failed:", err);
      const anyErr = err as { response?: { data?: { message?: string; error?: string } }; message?: string };
      const errorMessage =
        anyErr?.response?.data?.message ||
        anyErr?.response?.data?.error ||
        anyErr?.message ||
        "Email này có thể đã được sử dụng hoặc không hợp lệ.";
      toast({
        variant: "destructive",
        title: "Đăng ký không thành công",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMockGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await googleLogin({
        email: "demo.user@gmail.com",
        accessToken: "google-oauth-demo-token",
        username: "Google User",
      });
      const token = res?.data?.data?.accessToken || res?.data?.accessToken || "mock-jwt-token";
      await stateLogin(token);
      toast({
        title: "Đăng nhập bằng Google thành công!",
        description: "Chào mừng bạn đến với 33 RPM.",
      });
      navigate(redirectTarget);
    } catch {
      toast({
        title: "Đăng nhập bằng Google Demo",
        description: "Đang kết nối tài khoản Google.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#FAF8F4] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <FadeIn direction="up" className="w-full max-w-4xl bg-white border-2 border-zinc-900 rounded-2xl shadow-retro-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Column: Retro Vinyl Art Panel */}
        <div className="md:col-span-5 bg-[#13151A] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-zinc-900">
          <div className="space-y-3 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <Disc3 className="w-7 h-7 text-amber-400 animate-spin-slow" />
              <span className="text-2xl font-black font-display text-white">
                33 <span className="text-amber-400">RPM</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ngôi nhà của những người yêu đĩa than, băng cassette và âm thanh analog nguyên bản.
            </p>
          </div>

          <div className="my-8 relative z-10 space-y-4">
            <div className="bg-zinc-900/90 border border-zinc-700/80 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Đặc Quyền Thành Viên</span>
              </div>
              <ul className="text-[11px] text-zinc-300 space-y-1.5">
                <li>• Lưu danh sách Wishlist đĩa hiếm</li>
                <li>• Theo dõi hành trình bưu phẩm thời gian thực</li>
                <li>• Ưu tiên Pre-order các bản phát hành giới hạn</li>
              </ul>
            </div>
          </div>

          <div className="text-[11px] text-zinc-500 relative z-10">
            © {new Date().getFullYear()} 33 RPM Vietnam.
          </div>

          {/* Background Vinyl Ring */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border-[20px] border-white/5 pointer-events-none"></div>
        </div>

        {/* Right Column: Form (Login / Register Tabs) */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          
          {/* Notice banner if redirected from checkout or protected action */}
          {redirectTarget && redirectTarget.includes("checkout") && (
            <div className="bg-amber-50 border-2 border-amber-400/80 rounded-lg p-3 text-xs text-amber-950 font-medium flex items-center gap-2.5 shadow-sm">
              <Lock className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p>
                <b>Yêu cầu đăng nhập:</b> Đăng nhập tài khoản 33 RPM để bảo vệ đơn hàng và tiếp tục thanh toán. Hệ thống sẽ tự động đưa bạn về trang thanh toán ngay sau đó!
              </p>
            </div>
          )}

          {/* Tab Switcher */}
          <div className="flex border-b-2 border-zinc-200">
            <button
              type="button"
              onClick={() => setIsLoginTab(true)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 -mb-[2px] ${
                isLoginTab
                  ? "border-amber-500 text-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Đăng Nhập
            </button>
            <button
              type="button"
              onClick={() => setIsLoginTab(false)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 -mb-[2px] ${
                !isLoginTab
                  ? "border-amber-500 text-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Đăng Ký Mới
            </button>
          </div>

          {/* Social OAuth Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleMockGoogleLogin}
                className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-300 py-2.5 px-3 rounded text-xs font-bold text-zinc-800 shadow-sm transition-colors"
              >
                <FaGoogle className="w-4 h-4 text-red-500" />
                <span>Google</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleMockGoogleLogin}
                className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-300 py-2.5 px-3 rounded text-xs font-bold text-zinc-800 shadow-sm transition-colors"
              >
                <FaGithub className="w-4 h-4 text-black" />
                <span>GitHub</span>
              </motion.button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-zinc-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] font-bold text-zinc-400 uppercase tracking-widest absolute">
                Hoặc
              </span>
            </div>
          </div>

          {/* Form Content with Smooth Swipe & Fade Transition */}
          <AnimatePresence mode="wait">
            {isLoginTab ? (
              /* Login Form */
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleLoginSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                    Địa Chỉ Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2.5 text-xs text-zinc-900 focus:border-amber-400 focus:bg-white focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold uppercase text-zinc-700">
                      Mật Khẩu <span className="text-red-500">*</span>
                    </label>
                    <Link
                      to="/reset-password"
                      className="text-[11px] text-amber-600 hover:underline font-semibold"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2.5 text-xs text-zinc-900 focus:border-amber-400 focus:bg-white focus:outline-none"
                    />
                    <Lock className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#13151A] hover:bg-black text-amber-300 py-3 px-4 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-black shadow-retro-sm transition-colors"
                >
                  {loading ? (
                    <ClipLoader size={16} color="#F5C542" />
                  ) : (
                    <>
                      <span>ĐĂNG NHẬP VÀO TIỆM</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              /* Register Form */
              <motion.form
                key="register-form"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleRegisterSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                    Địa Chỉ Email Của Bạn <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2.5 text-xs text-zinc-900 focus:border-amber-400 focus:bg-white focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1.5">
                    Mật khẩu đăng nhập an toàn sẽ được hệ thống tạo tự động và gửi tới email của bạn.
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#13151A] hover:bg-black text-amber-300 py-3 px-4 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-black shadow-retro-sm transition-colors"
                >
                  {loading ? (
                    <ClipLoader size={16} color="#F5C542" />
                  ) : (
                    <>
                      <span>TẠO TÀI KHOẢN MỚI</span>
                      <UserCheck className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="text-[10px] text-zinc-400 text-center leading-relaxed">
            Bằng việc tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của 33 RPM.
          </div>

        </div>

      </FadeIn>
    </div>
  );
};

export default LoginSignup;
