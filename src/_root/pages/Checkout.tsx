import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { placeOrder } from "@/services/OrderService";
import { createPayment } from "@/services/PaymentService";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";
import {
  Truck,
  Building,
  QrCode,
  ShieldCheck,
  Lock,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const FREE_SHIPPING_THRESHOLD = 1000000;

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  // Address and Contact Form
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    city: "Hà Nội",
    district: "",
    address: "",
    note: "",
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<"vietqr" | "cod" | "bank_transfer">("vietqr");

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullname: currentUser.fullname || prev.fullname,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
        address: currentUser.address || prev.address,
      }));
    }
  }, [currentUser]);

  // If cart is empty, redirect to shop
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const isFreeShip = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShip ? 0 : 50000;
  const grandTotal = totalPrice + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullname.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.address.trim()) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin nhận hàng",
        description: "Vui lòng điền đầy đủ Họ tên, Số điện thoại, Email và Địa chỉ giao hàng.",
      });
      return;
    }

    setLoading(true);

    try {
      const fullAddress = `${formData.address}${formData.district ? `, ${formData.district}` : ""}, ${formData.city}`;

      const orderPayload = {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        customerAddress: fullAddress,
        note: formData.note.trim(),
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          productTitle: item.title,
          productPosterUrl: item.posterUrl,
        })),
      };

      const orderResponse = await placeOrder(orderPayload);
      const createdOrderId =
        orderResponse?.data?.data?.id ||
        orderResponse?.data?.data ||
        orderResponse?.data?.id ||
        `ORD-${Date.now()}`;

      // Create Payment if VietQR or Bank Transfer
      const idempotencyKey = `PAY-${createdOrderId}-${Date.now()}`;
      try {
        await createPayment({
          orderId: String(createdOrderId),
          method: paymentMethod,
          idempotencyKey,
          amount: grandTotal,
        });
      } catch (payErr) {
        console.warn("Payment initialization warning:", payErr);
      }

      toast({
        title: "Đặt hàng thành công! 🎉",
        description: `Mã đơn hàng #${createdOrderId} đã được khởi tạo.`,
      });

      clearCart();

      if (paymentMethod === "vietqr") {
        navigate(`/payment/vietqr/${grandTotal}?orderId=${createdOrderId}`);
      } else {
        navigate(`/order-details/${createdOrderId}`);
      }
    } catch (error) {
      console.error("Place order failed:", error);
      toast({
        variant: "destructive",
        title: "Đặt hàng không thành công",
        description: "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng kiểm tra lại kết nối và thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <FadeIn direction="down" className="border-b-2 border-zinc-900 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-zinc-900">
          Chi Tiết Thanh Toán & Đặt Hàng
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Hoàn tất các bước bên dưới để nhận những đĩa than được đóng gói cẩn thận từ 33 RPM.
        </p>
      </FadeIn>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Shipping & Billing Form */}
        <FadeIn direction="right" className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro space-y-4">
            <h2 className="text-base font-black font-display uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-3">
              1. Thông Tin Người Nhận
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Họ và Tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  required
                  placeholder="Ví dụ: Nguyễn Hoàng Long"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-zinc-300 rounded px-3 py-2.5 text-xs font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Số Điện Thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="0901 234 567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-zinc-300 rounded px-3 py-2.5 text-xs font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                Địa Chỉ Email (Nhận mã vận đơn & hóa đơn) <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-zinc-300 rounded px-3 py-2.5 text-xs font-medium focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Tỉnh / Thành Phố <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-zinc-300 rounded px-3 py-2.5 text-xs font-medium focus:border-amber-400 focus:outline-none"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Khác">Tỉnh thành khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Quận / Huyện
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="Quận Đống Đa, Ba Đình..."
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-zinc-300 rounded px-3 py-2.5 text-xs font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                Địa Chỉ Nhận Hàng Cụ Thể <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="Số nhà, tên ngõ, tên đường..."
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-white border border-zinc-300 rounded px-3 py-2.5 text-xs font-medium focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                Ghi Chú Đơn Hàng (Tùy chọn)
              </label>
              <textarea
                name="note"
                rows={2}
                placeholder="Lời dặn dò về thời gian giao, gửi tặng quà hay yêu cầu đóng gói đặc biệt..."
                value={formData.note}
                onChange={handleInputChange}
                className="w-full bg-white border border-zinc-300 rounded p-3 text-xs focus:border-amber-400 focus:outline-none"
              ></textarea>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro space-y-4">
            <h2 className="text-base font-black font-display uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-3">
              2. Phương Thức Thanh Toán
            </h2>

            <div className="space-y-3">
              {/* VietQR Option */}
              <label
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "vietqr"
                    ? "border-amber-500 bg-amber-50/50 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="mt-1"
                  checked={paymentMethod === "vietqr"}
                  onChange={() => setPaymentMethod("vietqr")}
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs uppercase text-zinc-900 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-amber-600" />
                      <span>Thanh Toán Bằng Mã VietQR (Khuyên dùng)</span>
                    </span>
                    <span className="text-[10px] bg-amber-400 text-black font-bold px-2 py-0.5 rounded">
                      Tự động 24/7
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Quét mã QR qua app ngân hàng hoặc MoMo. Hệ thống tự động xác nhận đơn hàng ngay lập tức.
                  </p>
                </div>
              </label>

              {/* COD Option */}
              <label
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-amber-500 bg-amber-50/50 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="mt-1"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div className="ml-3 flex-1">
                  <span className="font-extrabold text-xs uppercase text-zinc-900 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Thanh Toán Khi Nhận Hàng (COD)</span>
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Thanh toán tiền mặt cho nhân viên giao hàng khi nhận đĩa than tại nhà.
                  </p>
                </div>
              </label>

              {/* Bank Transfer */}
              <label
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "bank_transfer"
                    ? "border-amber-500 bg-amber-50/50 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="mt-1"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => setPaymentMethod("bank_transfer")}
                />
                <div className="ml-3 flex-1">
                  <span className="font-extrabold text-xs uppercase text-zinc-900 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-amber-600" />
                    <span>Chuyển Khoản Ngân Hàng Thủ Công</span>
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Chuyển khoản trực tiếp tới STK ngân hàng của 33 RPM và ghi nội dung là Mã đơn hàng.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </FadeIn>

        {/* Right Column: Order Summary Review */}
        <FadeIn direction="left" delay={0.1} className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro space-y-6">
            <h2 className="text-base font-black font-display uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>Đơn Hàng Của Bạn ({cart.length} đĩa)</span>
            </h2>

            {/* Line items preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 pr-1 space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center space-x-2 min-w-0">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded shadow-sm flex-shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-zinc-900 truncate">{item.title}</p>
                      <p className="text-[11px] text-zinc-500">Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-zinc-900 flex-shrink-0">
                    {((item.price || 0) * item.quantity).toLocaleString()} ₫
                  </span>
                </div>
              ))}
            </div>

            {/* Totals Calculation */}
            <div className="space-y-2 pt-4 border-t border-zinc-200 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Tạm tính ({cart.length} sản phẩm):</span>
                <span className="font-bold text-zinc-900">{totalPrice.toLocaleString()} ₫</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Phí giao hàng:</span>
                <span className="font-bold text-zinc-900">
                  {isFreeShip ? "Freeship (0 ₫)" : `${shippingCost.toLocaleString()} ₫`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-zinc-900 pt-3 border-t-2 border-zinc-900 font-display">
                <span>Tổng Thanh Toán:</span>
                <span className="text-xl text-amber-700">{grandTotal.toLocaleString()} ₫</span>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#13151A] hover:bg-black text-amber-300 py-4 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black shadow-retro transition-colors"
            >
              {loading ? (
                <ClipLoader size={18} color="#F5C542" />
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>XÁC NHẬN & ĐẶT HÀNG NGAY</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <div className="text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
              <span>Bảo mật thông tin thanh toán 100% tiêu chuẩn SSL</span>
            </div>
          </div>
        </FadeIn>

      </form>
    </div>
  );
};

export default Checkout;
