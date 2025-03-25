import React from "react";

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
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">
            Mã đơn hàng{" "}
            <span className="text-gray-800">CP985122021</span>
            <span className="ml-2 px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
              Đã giao hàng
            </span>
          </h2>

          <div className="mt-3">
            <p className="font-medium">Tên sản phẩm:</p>
            <p className="text-gray-700">*** SL-VN16847</p>
          </div>

          <div className="mt-3">
            <p className="font-medium">Nơi gửi:</p>
            <p className="text-gray-700">
              *** LEE, Quận 7, Tp. Hồ Chí Minh
            </p>
            <p className="text-gray-700">📞 090*******619</p>
          </div>

          <div className="mt-3">
            <p className="font-medium">Nơi nhận:</p>
            <p className="text-gray-700">
              *** Ky, Quận 12, Tp. Hồ Chí Minh
            </p>
            <p className="text-gray-700">📞 ********807</p>
          </div>
        </div>
        <div className="border-b pb-4 mb-4">
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
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">
            Hành trình vận đơn
          </h3>

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
                    <td className="border px-4 py-2">{item.time}</td>
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
  );
};

export default OrderDetails;
