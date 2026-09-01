import React from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Sparkles,
} from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 1000000; // 1,000,000 VND

const CartDrawer: React.FC = () => {
  const {
    cart,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const progressToFreeShipping = Math.min(
    (totalPrice / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );
  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - totalPrice,
    0
  );

  const handleCheckout = () => {
    closeDrawer();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    closeDrawer();
    navigate("/cart");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] text-[#13151A] shadow-2xl flex flex-col border-l border-zinc-300">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 bg-[#13151A] text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold font-display uppercase tracking-wide">
                Giỏ Hàng Của Bạn
              </h2>
              <span className="bg-amber-400 text-black text-xs font-extrabold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-amber-50 border-b border-amber-200 p-3.5 px-5">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-amber-900">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                {remainingForFreeShipping > 0
                  ? `Mua thêm ${remainingForFreeShipping.toLocaleString()} đ để được Freeship`
                  : "Bạn đã đủ điều kiện nhận Freeship toàn quốc! 🎉"}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-200">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-800">
                    Giỏ hàng đang trống
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1 max-w-xs">
                    Hãy lựa chọn những đĩa than kinh điển hoặc phụ kiện analog yêu thích của bạn nhé!
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeDrawer();
                    navigate("/product-category/vinyl");
                  }}
                  className="bg-[#13151A] hover:bg-black text-amber-300 px-6 py-2.5 rounded-none font-bold text-sm shadow-retro transition-transform active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  KHÁM PHÁ ĐĨA THAN
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md shadow-sm border border-zinc-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-zinc-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 truncate">
                      {item.artist || "Đĩa than chính hãng"}
                    </p>
                    <p className="text-sm font-bold text-amber-700 mt-1">
                      {item.price.toLocaleString()} ₫
                    </p>

                    {/* Stepper Quantity */}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center border border-zinc-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-600 hover:text-black hover:bg-zinc-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-zinc-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-600 hover:text-black hover:bg-zinc-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-500 p-1 transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-white space-y-4">
              <div className="flex items-center justify-between text-base font-bold">
                <span className="text-zinc-600">Tổng phụ:</span>
                <span className="text-xl text-zinc-900 font-extrabold">
                  {totalPrice.toLocaleString()} ₫
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Phí vận chuyển và mã ưu đãi sẽ được tính khi thanh toán.
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#13151A] hover:bg-black text-amber-300 py-3.5 px-4 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-retro transition-transform active:scale-[0.99]"
                >
                  <span>TIẾN HÀNH THANH TOÁN</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full bg-transparent hover:bg-zinc-100 text-zinc-800 border border-zinc-300 py-2.5 px-4 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Xem giỏ hàng chi tiết
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
