import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IOrder } from "types";
import { getOrderById } from "@/services/OrderService";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Package,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Truck,
  ArrowLeft,
  Disc3,
  ShieldCheck,
  FileText,
  Mail,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getOrderById(id);
        const data = res?.data?.data || res?.data;
        if (data) setOrder(data);
      } catch (err) {
        console.error("Failed to load order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <ClipLoader size={40} color="#E5A93C" />
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-600">
          Đang tải thông tin đơn hàng #{id}...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <Package className="w-16 h-16 text-zinc-400 mx-auto" />
        <h2 className="text-2xl font-black font-display text-zinc-900">
          Không tìm thấy đơn hàng #{id}
        </h2>
        <p className="text-xs text-zinc-500">
          Vui lòng kiểm tra lại mã vận đơn hoặc liên hệ với hotline của Vọc Records để được trợ giúp.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#13151A] text-amber-300 px-6 py-3 font-bold text-xs uppercase shadow-retro"
        >
          Trang chủ
        </Link>
      </div>
    );
  }

  const orderDateStr = order.orderDate || order.createdAt || new Date().toISOString();
  const formattedDate = format(new Date(orderDateStr), "dd/MM/yyyy HH:mm", {
    locale: vi,
  });

  // Calculate timeline steps
  const statusUpper = (order.status || "PENDING").toUpperCase();
  const stepIndex =
    statusUpper === "DELIVERED"
      ? 4
      : statusUpper === "SHIPPING"
      ? 3
      : statusUpper === "PROCESSING"
      ? 2
      : 1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-900 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-zinc-900">
              Chi Tiết Đơn Hàng #{order.id}
            </h1>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3 py-1 rounded-full uppercase">
              {order.status || "ĐANG XỬ LÝ"}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Ngày tạo đơn: {formattedDate}</p>
        </div>

        <Link
          to="/account/orders"
          className="text-xs font-bold text-zinc-700 hover:text-black flex items-center gap-1 uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Danh sách đơn hàng</span>
        </Link>
      </div>

      {/* Shipment Progress Stepper */}
      <div className="bg-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro">
        <h2 className="text-xs font-black font-display uppercase tracking-wider text-zinc-900 mb-6 flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-amber-500" />
          <span>Tiến Trình Giao Hàng</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          
          {/* Step 1: Placed */}
          <div className="flex flex-col items-center text-center space-y-2 relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                stepIndex >= 1
                  ? "bg-[#13151A] text-amber-400 ring-4 ring-amber-100"
                  : "bg-zinc-200 text-zinc-500"
              }`}
            >
              <FileText className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-zinc-900">Đã Nhận Đơn</p>
            <span className="text-[11px] text-zinc-500">{formattedDate}</span>
          </div>

          {/* Step 2: Processing */}
          <div className="flex flex-col items-center text-center space-y-2 relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                stepIndex >= 2
                  ? "bg-[#13151A] text-amber-400 ring-4 ring-amber-100"
                  : "bg-zinc-200 text-zinc-500"
              }`}
            >
              <Package className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-zinc-900">Đóng Gói Đĩa</p>
            <span className="text-[11px] text-zinc-500">Bọc xốp 3 lớp</span>
          </div>

          {/* Step 3: Shipping */}
          <div className="flex flex-col items-center text-center space-y-2 relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                stepIndex >= 3
                  ? "bg-[#13151A] text-amber-400 ring-4 ring-amber-100"
                  : "bg-zinc-200 text-zinc-500"
              }`}
            >
              <Truck className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-zinc-900">Đang Vận Chuyển</p>
            <span className="text-[11px] text-zinc-500">Giao hàng hỏa tốc</span>
          </div>

          {/* Step 4: Delivered */}
          <div className="flex flex-col items-center text-center space-y-2 relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                stepIndex >= 4
                  ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                  : "bg-zinc-200 text-zinc-500"
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-zinc-900">Giao Thành Công</p>
            <span className="text-[11px] text-zinc-500">Tận tay người nhận</span>
          </div>

        </div>
      </div>

      {/* Customer & Address Information 2-Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recipient details */}
        <div className="bg-white border-2 border-zinc-900 rounded-lg p-5 shadow-retro space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold uppercase text-zinc-900 text-sm border-b pb-2">
            <User className="w-4 h-4 text-amber-500" />
            <span>Thông Tin Người Nhận</span>
          </div>

          <div className="space-y-1.5 text-zinc-700">
            <p className="font-bold text-zinc-900 text-sm">{order.fullname}</p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{order.customerPhone}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>{order.email}</span>
            </p>
            <p className="flex items-start gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
              <span>{order.customerAddress}</span>
            </p>
          </div>

          {order.note && (
            <div className="pt-2 border-t text-[11px] text-zinc-500">
              <span className="font-bold">Ghi chú:</span> {order.note}
            </div>
          )}
        </div>

        {/* Sender & Shop Guarantee */}
        <div className="bg-[#FAF6EE] border-2 border-zinc-900 rounded-lg p-5 shadow-retro space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold uppercase text-zinc-900 text-sm border-b border-zinc-300 pb-2">
            <Disc3 className="w-4 h-4 text-amber-500" />
            <span>Đơn Vị Gửi Hàng</span>
          </div>

          <div className="space-y-1.5 text-zinc-700">
            <p className="font-bold text-zinc-900 text-sm">Vọc Records Vietnam</p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>Hotline hỗ trợ: 090 133 8619</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>11 Ngõ 133 Thái Hà, Đống Đa, Hà Nội</span>
            </p>
          </div>

          <div className="pt-2 border-t border-zinc-300 text-[11px] text-zinc-600 space-y-1">
            <p className="font-bold text-zinc-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Bảo hiểm hàng hóa 100%
            </p>
            <p>Cam kết 1 đổi 1 nếu đĩa bị cong vênh hoặc lỗi do nhà sản xuất trong 7 ngày.</p>
          </div>
        </div>

      </div>

      {/* Ordered Products Table */}
      <div className="bg-white border-2 border-zinc-900 rounded-lg shadow-retro overflow-hidden">
        <div className="bg-zinc-900 text-white p-4 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
          <span>Danh Sách Đĩa Than Trong Đơn Hàng</span>
          <span>{order.items ? order.items.length : 0} sản phẩm</span>
        </div>

        <div className="divide-y divide-zinc-200">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center space-x-3">
                  {item.productPosterUrl ? (
                    <img
                      src={item.productPosterUrl}
                      alt={item.productTitle}
                      className="w-14 h-14 object-cover rounded shadow-sm border border-zinc-200"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-zinc-900 rounded flex items-center justify-center">
                      <Disc3 className="w-6 h-6 text-amber-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-sm text-zinc-900">
                      {item.productTitle || `Mã đĩa #${item.productId}`}
                    </p>
                    <p className="text-zinc-500 mt-0.5">
                      Số lượng: <b className="text-zinc-900">{item.quantity}</b>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-extrabold text-sm text-amber-700">
                    {item.price ? `${(item.price * item.quantity).toLocaleString()} ₫` : "—"}
                  </p>
                  {item.price && (
                    <p className="text-[11px] text-zinc-400">
                      {item.price.toLocaleString()} ₫ / đĩa
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-zinc-400 italic">
              Thông tin chi tiết các tựa đĩa đang được cập nhật.
            </div>
          )}
        </div>

        {/* Total Summary Footer */}
        <div className="p-6 bg-zinc-50 border-t-2 border-zinc-900 space-y-2 text-xs">
          <div className="flex justify-between text-zinc-600">
            <span>Tổng tiền hàng:</span>
            <span className="font-bold text-zinc-900">
              {order.totalPrice ? order.totalPrice.toLocaleString("vi-VN") : "0"} ₫
            </span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>Phương thức thanh toán:</span>
            <span className="font-bold text-zinc-900 uppercase">
              {order.paymentMethod || "VietQR / Chuyển khoản"}
            </span>
          </div>
          <div className="flex justify-between text-base font-black text-zinc-900 pt-3 border-t border-zinc-200 font-display">
            <span>Tổng Tiền Đã Thanh Toán:</span>
            <span className="text-xl text-amber-700">
              {order.totalPrice ? order.totalPrice.toLocaleString("vi-VN") : "0"} ₫
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderDetails;
