import React, { useEffect, useState } from "react";
import { IOrder } from "types";
import { getMyOrders } from "@/services/OrderService";
import OrderItem from "./OrderItem";
import { Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const AccountOrders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getMyOrders();
        const data = res?.data?.data || res?.data || [];
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load /api/v1/orders/me:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold font-display uppercase tracking-tight text-zinc-900">
            Lịch Sử Đơn Hàng Của Bạn
          </h2>
        </div>
        <span className="text-xs font-semibold text-zinc-500">
          Tổng cộng: {orders.length} đơn hàng
        </span>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <ClipLoader size={30} color="#E5A93C" />
          <p className="text-xs text-zinc-500">Đang tải lịch sử đơn hàng...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-zinc-300 rounded-lg p-8 space-y-3">
          <ShoppingBag className="w-12 h-12 text-zinc-400 mx-auto" />
          <h3 className="text-base font-bold text-zinc-800">
            Bạn chưa có đơn hàng nào
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Hãy khám phá kho đĩa than phong phú của 33 RPM và đặt chiếc đĩa đầu tiên cho bộ sưu tập nhé!
          </p>
          <Link
            to="/product-category/vinyl"
            className="inline-block mt-2 bg-[#13151A] hover:bg-black text-amber-300 px-6 py-2.5 text-xs font-bold uppercase shadow-retro-sm"
          >
            Khám Phá Đĩa Than Ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountOrders;
