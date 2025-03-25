import { getOrders } from "@/services/OrderService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ICurrentUser, IOrder } from "types";

const AccountOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const currentUser = useSelector(
    (state: ICurrentUser) => state.auth
  );

  const fetchOrders = async () => {
    const response = await getOrders(currentUser.id);
    if (response?.data.success === true) {
      console.log(response?.data.data);

      setOrders(response?.data.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ĐƠN HÀNG</h1>
      <p className="text-muted-foreground mb-4">
        Theo dõi đơn hàng bên dưới.
      </p>
      <div className="bg-secondary text-secondary-foreground p-4 rounded-lg mb-4">
        <div className="grid grid-cols-6 font-semibold">
          <div>Đơn hàng</div>
          <div>Ngày</div>
          <div>Thanh toán</div>
          <div>Tình trạng</div>
          <div>Tổng</div>
          <div>Kiểm tra đơn hàng</div>
        </div>
      </div>

      <div className="grid grid-cols-6 text-start border-b border-border py-2 px-4">
        <div>SL-VN16847</div>
        <div>Mar 16, 2025 10:58PM</div>
        <div className="text-green-500">Đã thanh toán</div>
        <div>Thực hiện</div>
        <div>214.830₫</div>
        <button className="bg-primary text-xs font-semibold text-primary-foreground rounded-lg hover:bg-primary/80">
          Kiểm Tra Đơn Hàng
        </button>
      </div>
    </>
  );
};

export default AccountOrders;
