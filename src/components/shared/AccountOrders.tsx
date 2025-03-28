import { getOrders } from "@/services/OrderService";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICurrentUser, IOrder } from "types";
import OrderItem from "./OrderItem";

const AccountOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const currentUser = useSelector(
    (state: ICurrentUser) => state.auth
  );
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const response = await getOrders(currentUser.id);
    if (response?.data.success === true) {
      console.log(response?.data.data);

      setOrders(response?.data.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser.id]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token === "" || token === null) {
      navigate("/login-signup");
    }
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ĐƠN HÀNG</h1>
      <p className="text-muted-foreground mb-4">
        Theo dõi đơn hàng bên dưới.
      </p>
      <div className="bg-secondary text-secondary-foreground p-4 rounded-lg mb-4">
        <div className="grid grid-cols-5 font-semibold">
          <div>Đơn hàng</div>
          <div>Ngày</div>
          <div>Thanh toán</div>
          <div>Tổng</div>
          <div>Kiểm tra đơn hàng</div>
        </div>
      </div>

      {orders.map((order) => (
        // <div
        //   key={index}
        //   className="grid grid-cols-5 items-center text-start border-b border-border py-2 px-4 text-sm"
        // >
        //   <div>{item.id}</div>
        //   <div>{format(new Date(item.orderDate), "PPP")}</div>
        //   <div className="text-green-500">Đã thanh toán</div>
        //   <div>{item.totalPrice.toLocaleString("en-US")}₫</div>
        //   <button className="bg-primary text-xs font-semibold text-primary-foreground rounded-lg hover:bg-primary/80">
        //     Kiểm Tra Đơn Hàng
        //   </button>
        // </div>
        <OrderItem order={order} />
      ))}
    </>
  );
};

export default AccountOrders;
