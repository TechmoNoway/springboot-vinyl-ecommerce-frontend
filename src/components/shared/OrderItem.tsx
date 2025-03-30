import { useEffect, useRef, useState } from "react";
import { IOrder } from "types";
import autoAnimate from "@formkit/auto-animate";
import { format } from "date-fns";

interface Props {
  order: IOrder;
}

const OrderItem = ({ order }: Props) => {
  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current);
    }
  }, [parent]);

  const reveal = () => setShow(!show);

  console.log(order);

  return (
    <div
      ref={parent}
      className="border-gray-400 border-[1px] border-border rounded-md my-2 cursor-pointer"
    >
      <div
        onClick={reveal}
        className="grid grid-cols-5 items-center text-start text-sm dropdown-label py-3 px-4"
      >
        <div>{order.id}</div>
        <div>{format(new Date(order.orderDate), "PPP")}</div>
        <div className="text-green-500">Đã thanh toán</div>
        <div>{order.totalPrice.toLocaleString("en-US")}₫</div>
        <button className="bg-primary text-xs font-semibold text-primary-foreground rounded-lg hover:bg-primary/80">
          Kiểm Tra Đơn Hàng
        </button>
      </div>
      {show && (
        <div className="dropdown-content border-t-[1px] border-gray-400 py-3 px-4">
          <div className="grid grid-cols-6 text-xs mb-2">
            <div className="col-span-3">Thông tin đơn hàng</div>
            <div>Giá</div>
            <div>Số lượng</div>
            <div>Tổng</div>
          </div>
          {order.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-6 text-sm py-2 items-center border-t border-gray-200 font-semibold"
            >
              <div className="flex items-center gap-3 col-span-3">
                <img
                  src={item.productPosterUrl}
                  alt={item.productTitle}
                  className="w-28 h-28 object-cover"
                />
                <p className="font-medium text-sm">
                  {item.productTitle}
                </p>
              </div>
              <div>{item.price?.toLocaleString("en-US")}₫</div>
              <div>{item.quantity}</div>
              <div>
                {(item.price * item.quantity).toLocaleString("en-US")}
                ₫
              </div>
            </div>
          ))}
          <div className="border p-6 bg-beige-100 text-gray-900">
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {order.email}
                </p>

                <div>
                  <p className="font-medium">Địa chỉ thanh toán</p>
                  <p>{order.fullname}</p>
                  <p>{order.customerAddress}</p>
                  <p>Việt Nam</p>
                </div>

                <div>
                  <p className="font-medium">Địa chỉ nhận hàng</p>
                  <p>{order.fullname}</p>
                  <p>{order.customerAddress}</p>
                  <p>Việt Nam</p>
                </div>

                <p>
                  <span className="font-medium">
                    Phương thức vận chuyển:
                  </span>{" "}
                  Giao hàng thông thường
                </p>

                <p className="font-medium text-yellow-700">
                  Mã kiểm tra đơn hàng:{" "}
                  <span className="font-semibold">
                    Nhất Tín - {order.id}
                  </span>
                </p>
              </div>

              {/* Right Column */}
              <div className="space-y-4 text-right">
                <p>
                  <span className="font-medium">Tổng tiền:</span>{" "}
                  <span className="font-semibold">
                    {order.totalPrice}₫
                  </span>
                </p>
                <p>
                  <span className="font-medium">Phí giao hàng:</span>{" "}
                  0₫
                </p>
                <p>
                  <span className="font-medium">
                    Thuế (VAT 10.0%):
                  </span>{" "}
                  0₫
                </p>
                <p className="font-semibold text-yellow-700">
                  Tổng:{" "}
                  <span className="text-lg">
                    {order.totalPrice}₫ VND
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
