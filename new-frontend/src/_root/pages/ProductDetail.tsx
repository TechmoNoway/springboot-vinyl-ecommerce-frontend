import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { getProductByTitle } from '@/services/ProductService';
import { useEffect, useState } from 'react';
import { FaCommentAlt, FaHeart, FaInfoCircle, FaShoppingCart, FaVolumeUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { IProduct } from 'types';

const ProductDetail = () => {
    const params = useParams();
    const title = params.title;
    const { cart, dispatch } = useCart();

    const [product, setProduct] = useState<IProduct>();

    const fetchProduct = async () => {
        if (title) {
            const response = await getProductByTitle(title);
            if (response?.data.data) {
                setProduct(response.data.data);
            } else {
                console.error('Failed to fetch product');
            }
        } else {
            console.error('Title is undefined');
        }
    };

    const addToCart = () => {
        if (product?.id) {
            const existingCartItem = cart.find((item) => item.id === product?.id);
            if (existingCartItem) {
                dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { ...existingCartItem, quantity: existingCartItem.quantity + 1 },
                });
            } else {
                dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
            }
        } else {
            console.error('Product ID is undefined');
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [title]);

    return (
        <div className="px-4 sm:px-6 md:px-10 xl:px-80 py-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
                {/* Left: Product Image */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:pr-8">
                    <div className="border border-gray-300 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] xl:max-w-[590px]">
                        <img src={product?.posterUrl} alt={product?.title} className="w-full h-auto object-cover" />
                        <p className="text-xs sm:text-sm text-gray-500 py-2 text-center">
                            Hình ảnh minh họa. Vui lòng xem chi tiết chính xác tại mục mô tả sản phẩm.
                        </p>
                    </div>

                    {/* Thumbnail Preview */}
                    <div className="mt-4 flex space-x-2">
                        <img
                            src={product?.posterUrl}
                            alt="Thumbnail"
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded border border-gray-300 cursor-pointer hover:border-black"
                        />
                    </div>

                    <div className="bg-slate-100 p-5 mt-4">
                        {/* Header with Icon */}
                        <div className="flex items-center font-bold text-lg mb-3">
                            <FaCommentAlt className="mr-2" />
                            LƯU Ý KHI MUA HÀNG
                        </div>

                        {/* Bullet Points */}
                        <ul className="text-gray-800 list-disc pl-7 space-y-2">
                            <li>
                                Vui lòng chuyển khoản 100% đơn hàng có <b>sản phẩm PRE-ORDER</b>.
                            </li>
                            <li>
                                Giá sản phẩm <b>PRE-ORDER</b> cập nhật hàng tuần, Voc Records sẽ liên hệ nếu có chênh
                                lệch.
                            </li>
                            <li>
                                Thời gian vận chuyển: Sản phẩm <b>CÒN HÀNG 1-5 ngày</b>, sản phẩm{' '}
                                <b>PRE-ORDER 2-4 tuần</b>.
                            </li>
                            <li>
                                <b>KHÔNG HỦY / HOÀN TIỀN</b> sản phẩm PRE-ORDER.
                            </li>
                        </ul>

                        {/* Return Policy Link */}
                        <div className="mt-3 ml-7 font-bold cursor-pointer underline">QUY ĐỊNH ĐỔI TRẢ</div>
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-4 mt-6 lg:mt-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center lg:text-left">{product?.title}</h1>
                    <p className="text-lg text-black text-center lg:text-left">{product?.artist}</p>
                    <p className="text-center lg:text-left">Đĩa mới</p>

                    {/* Price & Availability */}
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <p className="text-xl font-bold">{product?.price.toLocaleString('en-US')} ₫</p>
                        <span className="text-green-600 text-xs sm:text-sm px-2 py-1 uppercase font-bold bg-green-100">
                            CÒN HÀNG
                        </span>
                    </div>

                    {/* Product Actions */}
                    <div className="flex flex-wrap justify-center lg:justify-start space-x-3 mt-4 border-t border-b py-4">
                        <Button className="bg-white px-4 flex items-center space-x-2 hover:bg-gray-100 rounded-none border-[1px] border-black hover:border-black shadow-[4px_4px_0px_#000000]">
                            <FaVolumeUp className="text-black" />
                        </Button>
                        <Button className="bg-white px-4 flex items-center space-x-2 hover:bg-gray-100 rounded-none border-[1px] border-black hover:border-black shadow-[4px_4px_0px_#000000]">
                            <FaHeart className="text-black" />
                        </Button>
                        <Button
                            onClick={addToCart}
                            className="bg-[#FFF27E] hover:bg-[#FFF27E] border-[1px] border-black hover:border-black px-6 sm:px-10 flex items-center rounded-none shadow-[4px_4px_0px_#000000] text-black"
                        >
                            <FaShoppingCart />
                            <p className="font-bold ml-2 text-xs sm:text-sm">THÊM VÀO GIỎ HÀNG</p>
                        </Button>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-black text-sm sm:text-base">{product?.description}</p>

                    {/* Product Specifications */}
                    <div className="mt-6 pt-10 pb-16">
                        <h2 className="text-lg font-bold pb-2 mb-6 border-b-[2px]  border-gray-400">THÔNG TIN ĐĨA</h2>
                        <div className="grid grid-cols-2 gap-y-2 text-gray-800">
                            <span className="font-semibold">Trọng lượng</span>
                            <span className="">5 kg</span>

                            <span className="font-semibold">Năm Sản Xuất</span>
                            <span>{product?.manufactureYear}</span>

                            <span className="font-semibold">Thể Loại</span>
                            <span>Electronic, Pop</span>

                            <span className="font-semibold">Định Dạng</span>
                            <span>{product?.platform}</span>

                            <span className="font-semibold">Hãng Phát Hành</span>
                            <span>{product?.studioName}</span>

                            <span className="font-semibold flex items-center">
                                Tình Trạng Đĩa <FaInfoCircle className="ml-1 text-gray-500" />
                            </span>
                            <span>M</span>

                            <span className="font-semibold">Tình Trạng Vỏ</span>
                            <span>M</span>

                            <span className="font-semibold">Quốc Gia</span>
                            <span>{product?.region}</span>

                            <span className="font-semibold">Mã Đĩa</span>
                            <span className="text-gray-500">602455542144</span>

                            <span className="font-semibold">Số Lượng</span>
                            <span>2 x Vinyl (LP, Album)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
