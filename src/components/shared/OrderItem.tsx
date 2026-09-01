import React from "react";
import { Link } from "react-router-dom";
import { IOrder } from "types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Package, ChevronRight, CheckCircle2, Clock, Truck, XCircle } from "lucide-react";

interface OrderItemProps {
  order: IOrder;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: {
    label: "Chờ thanh toán / xác nhận",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  PROCESSING: {
    label: "Đang đóng gói",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: <Package className="w-3.5 h-3.5" />,
  },
  SHIPPING: {
    label: "Đang giao hàng",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    icon: <Truck className="w-3.5 h-3.5" />,
  },
  DELIVERED: {
    label: "Đã giao thành công",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const status = statusConfig[order.status?.toUpperCase()] || {
    label: order.status || "Đang xử lý",
    color: "bg-zinc-100 text-zinc-800 border-zinc-300",
    icon: <Clock className="w-3.5 h-3.5" />,
  };

  const formattedDate = order.orderDate || order.createdAt
    ? format(new Date(order.orderDate || order.createdAt || Date.now()), "dd/MM/yyyy HH:mm", {
        locale: vi,
      })
    : "Vừa xong";

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 sm:p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-zinc-900">
              Đơn hàng #{order.id}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${status.color}`}
            >
              {status.icon}
              <span>{status.label}</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Ngày đặt: {formattedDate}</p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs text-zinc-500">Tổng thanh toán</p>
          <p className="text-base font-black text-amber-700">
            {order.totalPrice ? order.totalPrice.toLocaleString("vi-VN") : "0"} ₫
          </p>
        </div>
      </div>

      {/* Items Preview */}
      <div className="py-3 space-y-2">
        {order.items && order.items.length > 0 ? (
          order.items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs text-zinc-700">
              <span className="truncate max-w-xs sm:max-w-md font-medium">
                • {item.productTitle || `Mã đĩa #${item.productId}`}
              </span>
              <span className="text-zinc-500 flex-shrink-0">
                SL: {item.quantity} {item.price ? `× ${item.price.toLocaleString()} ₫` : ""}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-zinc-400 italic">Đơn hàng sản phẩm đĩa than</p>
        )}
        {order.items && order.items.length > 3 && (
          <p className="text-xs text-zinc-500 font-semibold">
            + {order.items.length - 3} sản phẩm khác...
          </p>
        )}
      </div>

      {/* Footer Action */}
      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-xs text-zinc-500 truncate max-w-xs">
          Địa chỉ nhận: {order.customerAddress}
        </span>
        <Link
          to={`/order-details/${order.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#13151A] hover:text-amber-600 uppercase tracking-wider"
        >
          <span>Chi tiết đơn hàng</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
