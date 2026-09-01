import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Disc3,
  Mail,
  Send,
  MapPin,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({
        title: "Đăng ký thành công!",
        description: "Bạn sẽ là người đầu tiên nhận thông báo khi có đĩa hiếm về.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0E1013] text-zinc-300 border-t border-zinc-800">
      {/* Newsletter Strip */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-r from-zinc-900 via-[#16181F] to-zinc-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-bold text-sm tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Voc Records Mixtape & Secret Drops</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Nhận thông báo đĩa than hiếm & ưu đãi độc quyền
            </h3>
            <p className="text-xs text-zinc-400">
              Không spam. Chỉ gửi những album tuyển chọn và danh sách đĩa mới cập bến mỗi tuần.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Nhập email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800/90 text-white text-xs rounded-none border border-zinc-700 pl-9 pr-4 py-3 focus:outline-none focus:border-amber-400"
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
            </div>
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase px-5 py-3 rounded-none shadow-retro-sm transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <span>ĐĂNG KÝ</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-amber-500/80">
                <Disc3 className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                VOC <span className="text-amber-400">RECORDS</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Không gian âm thanh analog nguyên bản dành cho những tâm hồn yêu âm nhạc đích thực. Chúng mình cung cấp đĩa than chính hãng, mâm đĩa hi-fi, băng cassette và dịch vụ order đĩa quốc tế.
            </p>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Số 11 Ngõ 133 Thái Hà, Đống Đa, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>090 133 8619 / 098 444 8619</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>09:00 - 21:30 (Mở cửa tất cả các ngày)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.facebook.com/vocrecords.vn/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-blue-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/vocrecords.vn/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-pink-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@vocrecords.vn"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-black text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                title="TikTok"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
              <a
                href="https://open.spotify.com/user/wqjqkylu7kqe2p7ey5ei2k9sr"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                title="Spotify"
              >
                <FaSpotify className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCcU5TObWmxHLA308cupIJOQ"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Danh Mục */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-display border-b border-zinc-800 pb-2">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/product-category/vinyl" className="hover:text-amber-400 transition-colors">
                  Đĩa than mới (New Vinyl)
                </Link>
              </li>
              <li>
                <Link to="/product-category/vinyl?platform=ĐĨA%20VINTAGE" className="hover:text-amber-400 transition-colors">
                  Đĩa than Vintage / Pre-owned
                </Link>
              </li>
              <li>
                <Link to="/product-category/vinyl?platform=CASSETTE" className="hover:text-amber-400 transition-colors">
                  Băng Cassette nguyên bản
                </Link>
              </li>
              <li>
                <Link to="/product-category/vinyl?category=Phụ%20kiện" className="hover:text-amber-400 transition-colors">
                  Mâm đĩa & Phụ kiện bảo quản
                </Link>
              </li>
              <li>
                <Link to="/product-category/vinyl?stockStatus=PREORDER" className="hover:text-amber-400 transition-colors">
                  Đĩa Pre-Order đặc biệt
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Hỗ Trợ Khách Hàng */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-display border-b border-zinc-800 pb-2">
              Chính Sách
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#return-policy" className="hover:text-amber-400 transition-colors">
                  Chính sách đổi trả & bảo hành
                </a>
              </li>
              <li>
                <a href="#shipping-policy" className="hover:text-amber-400 transition-colors">
                  Phương thức vận chuyển & đóng gói
                </a>
              </li>
              <li>
                <a href="#payment-policy" className="hover:text-amber-400 transition-colors">
                  Hướng dẫn thanh toán & VietQR
                </a>
              </li>
              <li>
                <a href="#grading-guide" className="hover:text-amber-400 transition-colors">
                  Quy chuẩn tình trạng đĩa (Goldmine Standard)
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-amber-400 transition-colors">
                  Chính sách bảo mật thông tin
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Tài Khoản */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-display border-b border-zinc-800 pb-2">
              Tài Khoản
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/account/details" className="hover:text-amber-400 transition-colors">
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-amber-400 transition-colors">
                  Theo dõi đơn hàng
                </Link>
              </li>
              <li>
                <Link to="/account/wishlist" className="hover:text-amber-400 transition-colors">
                  Danh sách yêu thích
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-amber-400 transition-colors">
                  Giỏ hàng hiện tại
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} VỌC RECORDS. Bản quyền thuộc về Vọc Records Vietnam.</p>
          <div className="flex items-center space-x-4">
            <span>Analog Sound Experience</span>
            <span>•</span>
            <span className="text-amber-400/80">Made with ❤️ for Vinyl Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
