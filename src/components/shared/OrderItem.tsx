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

  return (
    <div className="border-b border-border py-2 px-4">
      <div
        ref={parent}
        key={order.id}
        onClick={reveal}
        className="grid grid-cols-5 items-center text-start text-sm dropdown-label"
      >
        <div>{order.id}</div>
        <div>{format(new Date(order.orderDate), "PPP")}</div>
        <div className="text-green-500">Đã thanh toán</div>
        <div>{order.totalPrice.toLocaleString("en-US")}₫</div>
        <button className="bg-primary text-xs font-semibold text-primary-foreground rounded-lg hover:bg-primary/80">
          Kiểm Tra Đơn Hàng
        </button>
      </div>
      {show && <p className="dropdown-content">Lorum ipsum...</p>}

      {/* <div ref={parent}>
        <strong className="dropdown-label" onClick={reveal}>
          Click me to open!
        </strong>
        {show && <p className="dropdown-content">Lorum ipsum...</p>}
      </div> */}
    </div>
  );
};

export default OrderItem;
