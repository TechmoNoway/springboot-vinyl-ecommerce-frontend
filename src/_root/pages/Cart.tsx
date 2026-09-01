import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  Tag,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FREE_SHIPPING_THRESHOLD = 1000000;

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [shippingMethod, setShippingMethod] = useState<string>("bank");
  const [shippingCost, setShippingCost] = useState<number>(50000);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleShippingChange = (method: string, cost: number) => {
    setShippingMethod(method);
    setShippingCost(cost);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "VOCVINYL" || couponCode.toUpperCase() === "WELCOME") {
      const discount = Math.round(totalPrice * 0.1);
      setDiscountAmount(discount);
      toast({
        title: "Áp dụng mã giảm giá thành công!",
        description: `Bạn được giảm ${discount.toLocaleString()} ₫ (10%).`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Mã không hợp lệ",
        description: "Mã giảm giá không tồn tại hoặc đã hết hạn. Hãy thử mã 'VOCVINYL'.",
      });
    }
  };

  const isFreeShip = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const effectiveShipping = isFreeShip ? 0 : shippingCost;
  const grandTotal = Math.max(totalPrice - discountAmount + effectiveShipping, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-zinc-400" />
        </div>
        <h2 className="text-2xl font-black font-display text-zinc-900 uppercase">
          Giỏ Hàng Của Bạn Đang Trống
        </h2>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          Chưa có đĩa than nào trong giỏ. Hãy ghé qua cửa hàng để tìm cho mình những album tuyệt vời nhất nhé!
        </p>
        <button
          onClick={() => navigate("/product-category/vinyl")}
          className="bg-[#13151A] hover:bg-black text-amber-300 px-8 py-3.5 font-bold text-xs uppercase shadow-retro transition-transform active:scale-95"
        >
          Khám Phá Đĩa Than Ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-900 pb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-amber-500" />
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-zinc-900">
            Giỏ Hàng Của Bạn ({totalItems} sản phẩm)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-zinc-500 hover:text-red-500 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Xóa tất cả</span>
        </button>
      </div>

      {/* Main Grid: Items Table + Summary Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Items Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border-2 border-zinc-900 rounded-lg shadow-retro overflow-hidden">
            
            {/* Desktop Table Headers */}
            <div className="hidden sm:grid sm:grid-cols-12 bg-zinc-900 text-white p-3 text-xs font-bold uppercase tracking-wider">
              <div className="col-span-6">Sản Phẩm Đĩa Than</div>
              <div className="col-span-2 text-center">Đơn Giá</div>
              <div className="col-span-2 text-center">Số Lượng</div>
              <div className="col-span-2 text-right">Tổng Tiền</div>
            </div>

            {/* Cart Rows */}
            <div className="divide-y divide-zinc-200">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Product Info */}
                  <div className="sm:col-span-6 flex items-center space-x-3">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded shadow-sm border border-zinc-200 flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <Link
                        to={`/product/${encodeURIComponent(item.title)}`}
                        className="font-bold text-sm text-zinc-900 hover:text-amber-600 truncate block"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-zinc-500 truncate">
                        {item.artist || "Đĩa than chính hãng"}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-red-500 hover:underline flex items-center gap-1 mt-1 font-semibold"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-left sm:text-center text-xs font-bold text-zinc-700">
                    <span className="sm:hidden text-zinc-400 font-normal">Giá: </span>
                    {item.price ? item.price.toLocaleString() : "0"} ₫
                  </div>

                  {/* Quantity Stepper */}
                  <div className="sm:col-span-2 flex items-center sm:justify-center">
                    <div className="flex items-center border border-zinc-300 rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-zinc-600 hover:text-black"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-zinc-600 hover:text-black"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Row Total */}
                  <div className="sm:col-span-2 text-left sm:text-right text-sm font-extrabold text-amber-700">
                    <span className="sm:hidden text-zinc-400 font-normal text-xs">Tổng: </span>
                    {((item.price || 0) * item.quantity).toLocaleString()} ₫
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Coupon Code Strip */}
          <div className="bg-white border-2 border-zinc-900 rounded-lg p-4 shadow-retro flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-800">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Mã Giảm Giá Ưu Đãi (Thử: VOCVINYL)</span>
            </div>
            <form onSubmit={handleApplyCoupon} className="flex w-full sm:w-auto gap-2">
              <input
                type="text"
                placeholder="Nhập mã ưu đãi..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="bg-zinc-50 border border-zinc-300 text-xs px-3 py-2 rounded focus:outline-none uppercase font-bold text-zinc-800"
              />
              <button
                type="submit"
                className="bg-[#13151A] hover:bg-black text-amber-300 font-bold text-xs uppercase px-4 py-2 rounded shadow-retro-sm"
              >
                Áp Dụng
              </button>
            </form>
          </div>

          {/* Continue Shopping Button */}
          <div>
            <Link
              to="/product-category/vinyl"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-black"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tiếp tục chọn thêm đĩa than</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro space-y-6">
            
            <h3 className="text-lg font-black font-display uppercase tracking-tight text-zinc-900 border-b border-zinc-200 pb-3">
              Tổng Quan Đơn Hàng
            </h3>

            {/* Free Shipping Alert */}
            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-950 space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-700" />
                  {isFreeShip ? "Đã đạt Freeship toàn quốc! 🎉" : "Chính sách Freeship"}
                </span>
              </div>
              {!isFreeShip && (
                <p className="text-[11px] text-amber-800">
                  Mua thêm {(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString()} ₫ để được miễn phí vận chuyển.
                </p>
              )}
            </div>

            {/* Shipping Option Radios */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-zinc-800">
                Phương Thức Giao Hàng
              </label>
              
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-2.5 border rounded cursor-pointer hover:bg-zinc-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "bank"}
                      onChange={() => handleShippingChange("bank", 50000)}
                    />
                    <span>Giao hàng tiêu chuẩn (Chuyển khoản)</span>
                  </div>
                  <span className="font-bold">{isFreeShip ? "0 ₫" : "50,000 ₫"}</span>
                </label>

                <label className="flex items-center justify-between p-2.5 border rounded cursor-pointer hover:bg-zinc-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "cod"}
                      onChange={() => handleShippingChange("cod", 65000)}
                    />
                    <span>Giao hàng thu tiền tận nơi (COD)</span>
                  </div>
                  <span className="font-bold">{isFreeShip ? "0 ₫" : "65,000 ₫"}</span>
                </label>

                <label className="flex items-center justify-between p-2.5 border rounded cursor-pointer hover:bg-zinc-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "store"}
                      onChange={() => handleShippingChange("store", 0)}
                    />
                    <span>Nhận tại tiệm (11/133 Thái Hà, HN)</span>
                  </div>
                  <span className="font-bold text-emerald-600">Miễn phí</span>
                </label>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-4 border-t border-zinc-200 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Tạm tính:</span>
                <span className="font-bold text-zinc-900">{totalPrice.toLocaleString()} ₫</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Mã giảm giá (VOCVINYL):</span>
                  <span>-{discountAmount.toLocaleString()} ₫</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Phí vận chuyển:</span>
                <span className="font-bold text-zinc-900">
                  {effectiveShipping === 0 ? "Miễn phí" : `${effectiveShipping.toLocaleString()} ₫`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-zinc-900 pt-3 border-t border-zinc-200 font-display">
                <span>Tổng Cộng:</span>
                <span className="text-xl text-amber-700">{grandTotal.toLocaleString()} ₫</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-amber-400 hover:bg-amber-300 text-black py-4 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black shadow-retro transition-transform active:scale-[0.99]"
            >
              <span>TIẾN HÀNH ĐẶT HÀNG</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;
