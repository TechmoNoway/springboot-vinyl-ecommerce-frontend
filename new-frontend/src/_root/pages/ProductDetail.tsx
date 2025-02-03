import { getProductByTitle } from '@/services/ProductService';
import { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart, FaVolumeUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { IProduct } from 'types';

const ProductDetail = () => {
    const params = useParams();
    const title = params.title;

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

    useEffect(() => {
        fetchProduct();
    }, [title]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Product Image */}
                <div className="flex flex-col items-center">
                    <img src={product?.posterUrl} alt="1989 (Taylor's Version)" className="w-80 rounded shadow-lg" />
                    <p className="text-sm text-gray-500 mt-2">
                        Hình ảnh minh họa. Vui lòng xem chi tiết chính xác tại mục mô tả sản phẩm
                    </p>

                    {/* Thumbnail Preview */}
                    <div className="mt-4 flex space-x-2">
                        <img
                            src="/your-product-thumbnail.jpg"
                            alt="Thumbnail"
                            className="w-16 h-16 rounded border border-gray-300 cursor-pointer hover:border-black"
                        />
                    </div>
                </div>

                {/* Right: Product Details */}
                <div>
                    <h1 className="text-2xl font-bold">1989 (TAYLOR'S VERSION) [2 LP]</h1>
                    <p className="text-lg text-gray-600">TAYLOR SWIFT</p>
                    <p className="text-xl font-bold mt-2">1,360,000 ₫</p>

                    {/* Availability */}
                    <span className="bg-green-200 text-green-700 text-sm font-bold px-2 py-1 rounded">CÒN HÀNG</span>

                    {/* Product Actions */}
                    <div className="flex space-x-2 mt-4">
                        <button className="flex items-center bg-yellow-400 border border-black px-4 py-2 font-bold hover:bg-yellow-500">
                            <FaShoppingCart className="mr-2" />
                            THÊM VÀO GIỎ HÀNG
                        </button>
                        <button className="border px-4 py-2 hover:bg-gray-100">
                            <FaHeart />
                        </button>
                        <button className="border px-4 py-2 hover:bg-gray-100">
                            <FaVolumeUp />
                        </button>
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-gray-700">
                        Album "Taylor Swift – 1989 (Taylor’s Version)” là một bộ sưu tập các hit đỉnh cao của nữ ca sĩ
                        tài năng Taylor Swift...
                    </p>

                    {/* Product Specifications */}
                    <div className="mt-6">
                        <h2 className="text-lg font-bold">THÔNG TIN ĐĨA</h2>
                        <ul className="mt-2 space-y-1 text-gray-700">
                            <li>
                                <strong>Trọng lượng:</strong> 5 kg
                            </li>
                            <li>
                                <strong>Năm Sản Xuất:</strong> 2014
                            </li>
                            <li>
                                <strong>Thể Loại:</strong> Electronic, Pop
                            </li>
                            <li>
                                <strong>Định Dạng:</strong> Đĩa Mới
                            </li>
                            <li>
                                <strong>Hãng Phát Hành:</strong> Big Machine Records
                            </li>
                            <li>
                                <strong>Tình Trạng Đĩa:</strong> M
                            </li>
                            <li>
                                <strong>Tình Trạng Vỏ:</strong> M
                            </li>
                            <li>
                                <strong>Quốc Gia:</strong> US
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
