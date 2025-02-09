import { useState } from 'react';

const Checkout = () => {
    const [shippingCost, setShippingCost] = useState(0);
    const subtotal = 3020000;
    const total = subtotal + shippingCost;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">CHI TIẾT THANH TOÁN</h2>

            {/* Billing Details */}
            <div className="grid grid-cols-2 gap-4 bg-white p-6 shadow-md rounded-md">
                <div>
                    <label className="font-bold">Họ và tên: *</label>
                    <input type="text" placeholder="Họ tên của bạn" className="w-full p-2 border mt-1" />
                </div>
                <div>
                    <label className="font-bold">Số điện thoại: *</label>
                    <input type="text" placeholder="Số điện thoại của bạn" className="w-full p-2 border mt-1" />
                </div>
                <div>
                    <label className="font-bold">Địa chỉ email:</label>
                    <input type="email" placeholder="Email của bạn" className="w-full p-2 border mt-1" />
                </div>
                <div>
                    <label className="font-bold">Tỉnh/Thành phố: *</label>
                    <select className="w-full p-2 border mt-1">
                        <option>Hà Nội</option>
                    </select>
                </div>
                <div>
                    <label className="font-bold">Quận/Huyện: *</label>
                    <select className="w-full p-2 border mt-1">
                        <option>Chọn quận/huyện</option>
                    </select>
                </div>
                <div>
                    <label className="font-bold">Xã/Phường: *</label>
                    <select className="w-full p-2 border mt-1">
                        <option>Chọn xã/phường</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="font-bold">Địa chỉ: *</label>
                    <input type="text" placeholder="Ví dụ: Số 20, ngõ 90" className="w-full p-2 border mt-1" />
                </div>
            </div>

            {/* Shipping Options */}
            <div className="mt-6 bg-gray-100 p-6">
                <h3 className="font-bold text-lg">PHƯƠNG THỨC THANH TOÁN</h3>
                <p className="text-gray-600 mt-2">Chuyển khoản qua ngân hàng</p>
                <p className="text-gray-500">Thực hiện thanh toán vào tài khoản ngân hàng của Vọc Records.</p>

                <table className="w-full mt-4 border">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">SẢN PHẨM</th>
                            <th className="p-2 text-right">TẠM TÍNH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Cigarettes After S** × 2</td>
                            <td className="p-2 text-right">2,060,000 đ</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Adele - 25 × 1</td>
                            <td className="p-2 text-right">960,000 đ</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-bold">TẠM TÍNH</td>
                            <td className="p-2 text-right font-bold">3,020,000 đ</td>
                        </tr>
                    </tbody>
                </table>

                {/* Shipping Options */}
                <div className="mt-4">
                    <label className="block">
                        <input
                            type="radio"
                            name="shipping"
                            checked={shippingCost === 0}
                            onChange={() => setShippingCost(0)}
                        />
                        FREE SHIP
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            name="shipping"
                            checked={shippingCost === 50000}
                            onChange={() => setShippingCost(50000)}
                        />
                        THANH TOÁN CHUYỂN KHOẢN: 50,000 đ
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            name="shipping"
                            checked={shippingCost === 65000}
                            onChange={() => setShippingCost(65000)}
                        />
                        THANH TOÁN KHI NHẬN HÀNG (COD): 65,000 đ
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            name="shipping"
                            checked={shippingCost === 0}
                            onChange={() => setShippingCost(0)}
                        />
                        NHẬN TẠI 11/133 THÁI HÀ (Thanh toán trước & đến lấy)
                    </label>
                </div>

                {/* Total Cost */}
                <div className="mt-4 flex justify-between font-bold text-lg">
                    <span>TỔNG CỘNG:</span>
                    <span>{total.toLocaleString()} đ</span>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white py-3 mt-4 text-lg font-bold">ĐẶT HÀNG</button>
            </div>

            {/* Order Notes */}
            <div className="mt-6">
                <label className="font-bold">Ghi chú đơn hàng (tùy chọn)</label>
                <textarea
                    className="w-full p-4 border mt-2"
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn."
                ></textarea>
            </div>
        </div>
    );
};

export default Checkout;
