import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const [shippingDetails, setShippingDetails] = useState({
        shippingCost: 50000,
        paymentMethod: 'chuyen-khoan',
    });

    const tempTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalPrice =
        cart.reduce((total, item) => total + item.price * item.quantity, 0) + shippingDetails.shippingCost;

    const handleShippingChange = (cost: number, method: string) => {
        setShippingDetails({ shippingCost: cost, paymentMethod: method });
    };

    const handleConfirmOrder = () => {
        if (shippingDetails.paymentMethod === 'vietqr') {
            navigate(`/payment/vietqr/${totalPrice}`);
        }
        console.log(shippingDetails.paymentMethod);
    };

    return (
        <div className="flex flex-col md:flex-row px-4 sm:px-6 md:px-10 xl:px-80 py-10 space-y-10 md:space-y-0 md:space-x-10">
            <div className="w-full md:w-4/12">
                <h2 className="text-2xl font-bold mb-4">CHI TIẾT THANH TOÁN</h2>

                {/* Billing Details */}
                <div className="bg-white pb-6 pr-6">
                    <label className="font-normal">Họ và tên: *</label>
                    <input
                        type="text"
                        placeholder="Họ tên của bạn"
                        className="w-full p-2 border-[1px] border-[#ccc] bg-white mt-1"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white pr-6 pb-6">
                    <div>
                        <label className="font-normal">Số điện thoại: *</label>
                        <input
                            type="text"
                            placeholder="Số điện thoại của bạn"
                            className="w-full p-2 border-[1px] border-[#ccc] bg-white mt-1"
                        />
                    </div>
                    <div>
                        <label className="font-normal">Địa chỉ email:</label>
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            className="w-full p-2 border-[1px] border-[#ccc] bg-white mt-1"
                        />
                    </div>
                    <div>
                        <label className="font-normal">Tỉnh/Thành phố: *</label>
                        <select className="w-full p-2 border-[1px] border-[#ccc] bg-white mt-1">
                            <option>Hà Nội</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-normal">Quận/Huyện: *</label>
                        <select className="w-full p-2 border-[1px] border-[#ccc] bg-white mt-1">
                            <option>Chọn quận/huyện</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-normal">Xã/Phường: *</label>
                        <select className="w-full p-2 border-[1px] border-[#ccc] bg-white mt-1">
                            <option>Chọn xã/phường</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="font-normal">Địa chỉ: *</label>
                        <input
                            type="text"
                            placeholder="Ví dụ: Số 20, ngõ 90"
                            className="w-full p-2 border-[1px] border-[#ccc] bg-white mt-1"
                        />
                    </div>
                </div>

                {/* Order Notes */}
                <div className="mt-6 pr-6">
                    <label className="font-normal">Ghi chú đơn hàng (tùy chọn)</label>
                    <textarea
                        className="w-full p-2 border-[1px] border-[#ccc] bg-white mt-1 min-h-72"
                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn."
                    ></textarea>
                </div>
            </div>

            <div className="w-full md:w-8/12">
                <h3 className="text-2xl font-bold mb-4">PHƯƠNG THỨC THANH TOÁN</h3>
                {/* Shipping Options */}
                <div className="mt-6 bg-[#F2F4F8] px-6 pt-3 pb-6">
                    <p className="text-black text-sm mt-2">Chuyển khoản qua ngân hàng</p>
                    <p className="text-black mt-2">Thực hiện thanh toán vào tài khoản ngân hàng của Vọc Records.</p>

                    <table className="w-full mt-16">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left font-semibold">SẢN PHẨM</th>
                                <th className="p-2 text-left font-semibold">TẠM TÍNH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">
                                        {item.title} × {item.quantity}
                                    </td>
                                    <td className="p-2 border-l">{item.price.toLocaleString()} đ</td>
                                </tr>
                            ))}
                            <tr className="border-b">
                                <td className="p-2 font-semibold">TẠM TÍNH</td>
                                <td className="p-2 font-bold border-l ">{tempTotalPrice.toLocaleString()} đ</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">GIAO HÀNG</td>
                                <td className="p-2 font-bold border-l ">
                                    <label className="flex space-x-2 font-normal mt-1">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={shippingDetails.shippingCost === 50000}
                                            onChange={() => handleShippingChange(50000, 'chuyen-khoan')}
                                        />
                                        <p className="">THANH TOÁN CHUYỂN KHOẢN: 50,000 đ</p>
                                    </label>
                                    <label className="flex space-x-2 font-normal mt-1">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={shippingDetails.shippingCost === 65000}
                                            onChange={() => handleShippingChange(65000, 'cod')}
                                        />
                                        <p className="">THANH TOÁN KHI NHẬN HÀNG (COD): 65,000 đ</p>
                                    </label>
                                    <label className="flex space-x-2 font-normal mt-1">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={shippingDetails.shippingCost === 0}
                                            onChange={() => handleShippingChange(0, 'nhan-tai-cua-hang')}
                                        />
                                        <p className="">NHẬN TẠI 11/133 THÁI HÀ (Thanh toán trước & đến lấy)</p>
                                    </label>
                                    <label className="flex space-x-2 font-normal mt-1">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={shippingDetails.paymentMethod === 'vietqr'}
                                            onChange={() =>
                                                handleShippingChange(shippingDetails.shippingCost, 'vietqr')
                                            }
                                        />
                                        <p className="uppercase">Thanh toán bằng VietQR</p>
                                    </label>
                                </td>
                            </tr>
                            <tr className="">
                                <td className="p-2 font-semibold">TỔNG</td>
                                <td className="p-2 font-bold border-l ">{totalPrice.toLocaleString()} đ</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="p-2 mt-8">
                        Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website,
                        và cho các mục đích cụ thể khác đã được mô tả trong chính sách riêng tư.
                    </p>

                    {/* Total Cost */}
                    <div className="mt-2 flex items-center font-bold text-l p-2">
                        <span className="text-2xl">TỔNG CỘNG:</span>
                        <span className="text-2xl ml-4">{totalPrice.toLocaleString()} đ</span>
                    </div>

                    {/* Checkout Button */}
                    <Button
                        onClick={handleConfirmOrder}
                        className="bg-black hover:bg-black hover:border-black text-white py-6 px-12 mt-4 text-lg font-bold rounded-none"
                    >
                        ĐẶT HÀNG
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
