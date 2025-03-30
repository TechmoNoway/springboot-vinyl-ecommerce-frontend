import { getOrders } from "@/services/OrderService";
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

      {orders.map((order, index) => (
        <OrderItem order={order} key={index} />
      ))}
    </>
  );
};

export default AccountOrders;
