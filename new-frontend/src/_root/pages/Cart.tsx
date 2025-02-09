import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, dispatch } = useCart();
    const [shippingCost, setShippingCost] = useState(50000);
    const navigate = useNavigate();

    const handleIncreaseQuantity = (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: id, quantity: quantity + 1 } });
    };

    const handleDecreaseQuantity = (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: id, quantity: quantity - 1 } });
    };

    const handleRemoveItem = (id: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const tempTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0) + shippingCost;

    return (
        <div className="px-4 sm:px-6 md:px-10 xl:px-80 py-10">
            {cart.length === 0 ? (
                <>
                    <p className="mt-6 bg-[#def2f8] p-3 border-[1px] border-[#d1edf6] text-[#2f6473]">
                        Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
                    </p>

                    <Button
                        onClick={() => navigate('/')}
                        className="mt-6 bg-black text-white py-2 rounded-none hover:border-black hover:bg-black hover:underline"
                    >
                        Quay trở lại cửa hàng
                    </Button>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">GIỎ HÀNG</h2>
                    {/* Cart Items Section */}
                    <div className="flex space-x-5 mt-9">
                        <div className="w-8/12 flex flex-col border-r-[1px] border-l-[1px] border-b-[1px] border-t-2 border-gray-200 px-4 py-7">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-2"></th>
                                        <th className="text-left p-2 font-semibold text-zinc-500">TÊN SẢN PHẨM</th>
                                        <th className="p-2 font-semibold text-zinc-500">ĐƠN GIÁ</th>
                                        <th className="p-2 font-semibold text-zinc-500">SỐ LƯỢNG</th>
                                        <th className="p-2 font-semibold text-zinc-500">TỔNG TIỀN</th>
                                        <th className="p-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-2 text-center">
                                                <Link to={`/product/${item.title}`}>
                                                    <img
                                                        src={item.posterUrl}
                                                        alt={item.title}
                                                        className="w-16 h-16 mr-3"
                                                    />
                                                </Link>
                                            </td>
                                            <td className="p-2 items-center">{item.title}</td>
                                            <td className="p-2 text-center">{item.price.toLocaleString()} đ</td>
                                            <td className="p-2 flex items-center justify-center mt-3">
                                                <Button
                                                    onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                                    className="px-3 bg-transparent hover:bg-transparent text-black border-black hover:border-black rounded-none w-8 h-8"
                                                >
                                                    -
                                                </Button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    className="h-8 bg-white border-t-[1px] border-b-[1px] border-black rounded-none text-center w-20"
                                                    onChange={(e) =>
                                                        dispatch({
                                                            type: 'UPDATE_QUANTITY',
                                                            payload: { id: item.id, quantity: Number(e.target.value) },
                                                        })
                                                    }
                                                />
                                                <Button
                                                    onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                                                    className="px-3 bg-transparent hover:bg-transparent text-black border-black hover:border-black rounded-none w-8 h-8"
                                                >
                                                    +
                                                </Button>
                                            </td>
                                            <td className="p-2 text-center">
                                                {(item.price * item.quantity).toLocaleString()} đ
                                            </td>
                                            <td
                                                className="p-2 text-red-500 cursor-pointer"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                ✖
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Discount Code */}
                            <div className="bg-gray-100 p-4 mt-12">
                                <p className="font-bold text-sm py-1">MÃ GIẢM GIÁ</p>

                                <div className="mt-6">
                                    <p className="text-sm">Nhập mã giảm giá của bạn:</p>
                                    <div className="flex space-x-1 mt-2">
                                        <input
                                            type="text"
                                            className="p-2 border h-9 bg-white w-44 text-sm text-gray-500"
                                        />
                                        <Button className="bg-black hover:bg-black hover:border-black text-white px-6 py-2 rounded-none h-9 font-normal">
                                            ÁP DỤNG
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Continue Shopping & Update Cart */}
                            <div className="flex-grow"></div>
                            <div className="flex justify-between mt-4 w-full items-end">
                                <Button className="border px-4 py-2 rounded-none bg-white hover:bg-white border-zinc-400 hover:border-zinc-400 text-zinc-500 shadow-sm">
                                    TIẾP TỤC MUA HÀNG
                                </Button>
                                <Button className="border px-4 py-2 rounded-none bg-white hover:bg-white border-zinc-400 hover:border-zinc-400 text-zinc-500 shadow-sm">
                                    CẬP NHẬT GIỎ HÀNG
                                </Button>
                            </div>
                        </div>

                        <div className="w-4/12">
                            {/* Shipping Cost Selection */}
                            <div className="bg-gray-100 p-4">
                                <p className="font-bold text-sm py-3">DỰ TOÁN VẬN CHUYỂN VÀ THUẾ</p>
                                <div className="flex flex-col space-y-4 mt-5">
                                    <label className="flex space-x-2">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={shippingCost === 50000}
                                            onChange={() => setShippingCost(50000)}
                                        />
                                        <p className="text-[14px]">THANH TOÁN CHUYỂN KHOẢN: 50,000 đ</p>
                                    </label>
                                    <label className="flex space-x-2">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={shippingCost === 65000}
                                            onChange={() => setShippingCost(65000)}
                                        />
                                        <p className="text-[14px]">THANH TOÁN KHI NHẬN HÀNG (COD): 65,000 đ</p>
                                    </label>
                                    <label className="flex space-x-2">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={shippingCost === 0}
                                            onChange={() => setShippingCost(0)}
                                        />
                                        <p className="text-[14px]">
                                            NHẬN TẠI 11/133 THÁI HÀ (Thanh toán trước & đến lấy)
                                        </p>
                                    </label>
                                </div>
                                <p className="mt-4">
                                    Vận chuyển đến <span className="font-bold">Hà Nội</span>.
                                </p>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-100 p-4 mt-4">
                                <p className="font-bold text-sm py-3">TỔNG TIỀN GIỎ HÀNG</p>
                                <div className="flex justify-between mt-10">
                                    <span>Tạm tính:</span>
                                    <span className="font-semibold">{tempTotalPrice.toLocaleString()} đ</span>
                                </div>
                                <div className="flex justify-between mt-2 font-bold text-lg border-t-2">
                                    <span className="font-normal">Tổng Cộng:</span>
                                    <span>{totalPrice.toLocaleString()} đ</span>
                                </div>
                                <Button className="w-full bg-black text-white py-2 mt-4 rounded-none hover:border-black hover:bg-black">
                                    TIẾN HÀNH THANH TOÁN
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Suggested Products */}
            <div className="mt-14">
                <p className="font-bold text-xl">ƯU ĐÃI CHO BẠN</p>
                <p className="mt-6 bg-[#def2f8] p-3 border-[1px] border-[#d1edf6] text-[#2f6473]">
                    Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
                </p>
            </div>
        </div>
    );
};

export default CartPage;
