import { getOrderById } from "@/services/OrderService";
import { LucideMapPin, Smartphone, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const deliveryData = [
  {
    time: "19/03/2025 14:43",
    location: "Quận 12 - Tp. Hồ Chí Minh",
    status: "Trả vận đơn cho Phương",
  },
  {
    time: "19/03/2025 09:08",
    location: "Quận 12 - Tp. Hồ Chí Minh",
    status: "Xuất kho trả hàng: 5012-01-01-Kho Bưu Cục Quận 12",
  },
  {
    time: "19/03/2025 07:36",
    location: "Quận 12 - Tp. Hồ Chí Minh",
    status: "Nhập kho: 5012-01-01-Kho Bưu Cục Quận 12",
  },
  {
    time: "19/03/2025 03:37",
    location: "Quận Thủ Đức - Tp. Hồ Chí Minh",
    status:
      "Xuất kho: 50ST01-Kho Sóng Thần đến 5012-01-01-Kho Bưu Cục Quận 12",
  },
];

const OrderDetails = () => {
  const [order, setOrder] = useState({});

  const param = useParams();

  const fecthOrderDetails = async () => {
    const response = await getOrderById(param.id);

    if (response?.data.success === true) {
      setOrder(response?.data.data);
    }
  };

  console.log(order);

  useEffect(() => {
    fecthOrderDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="flex items-center space-x-1 text-lg font-semibold">
          <span className="text-gray-400">Mã đơn hàng</span>
          <span className="text-gray-800">CP985122021</span>
          <span className="ml-2 px-2 py-1 text-xs bg-lime-50 text-green-500 rounded">
            Đã giao hàng
          </span>
        </h2>
        <div className="grid grid-cols-3">
          <div className="pb-4 mb-4">
            <div className="mt-3">
              <p className="font-semibold">Tên sản phẩm:</p>
              <p className="text-gray-700 mt-1 text-sm font-semibold">
                *** SL-VN16847
              </p>
            </div>

            <div className="mt-3">
              <p className="font-medium text-zinc-500">Nơi gửi:</p>
              <div className="flex flex-col space-y-2 mt-2">
                <div className="flex items-center space-x-1 text-xs">
                  <UserRound className="h-4 w-4" />
                  <p className="font-semibold">*** LEE</p>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <LucideMapPin className="h-4 w-4" />
                  <p className="font-semibold">
                    Quận 7, Tp. Hồ Chí Minh
                  </p>
                </div>

                <div className="flex items-center space-x-1 text-xs">
                  <Smartphone className="h-4 w-4" />
                  <p className="font-semibold">090*******619</p>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <p className="font-medium text-zinc-500">Nơi nhận:</p>
              <div className="flex flex-col space-y-2 mt-2">
                <div className="flex items-center space-x-1 text-xs">
                  <UserRound className="h-4 w-4" />
                  <p className="font-semibold">*** LEE</p>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <LucideMapPin className="h-4 w-4" />
                  <p className="font-semibold">
                    Quận 7, Tp. Hồ Chí Minh
                  </p>
                </div>

                <div className="flex items-center space-x-1 text-xs">
                  <Smartphone className="h-4 w-4" />
                  <p className="font-semibold">090*******619</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Trạng thái vận chuyển
            </h3>

            <div className="relative pl-6">
              <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-300"></div>

              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <p className="text-gray-700">Đã lấy hàng</p>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <p className="text-gray-700">Đang vận chuyển</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  ✅
                </div>
                <p className="text-gray-700">Đã giao hàng</p>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <div>
              <p className="text-sm font-semibold mb-2">
                Dịch vụ: CPN 16:07
              </p>
              <p>Thời gian giao hàng dự kiến: 18/03/2025</p>
              <p>
                Sự cố giao hàng: Không liên hệ được với khách - 09:57
                19/03/2025
              </p>
              <p className="font-semibold">Hành trình vận đơn</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-yellow-400 text-white">
                    <th className="border px-4 py-2 text-left">
                      Thời gian
                    </th>
                    <th className="border px-4 py-2 text-left">
                      Hành trình
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryData.map((item, index) => (
                    <tr key={index} className="border">
                      <td className="border px-4 py-2">
                        {item.time}
                      </td>
                      <td className="border px-4 py-2">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
