import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { Button } from '../ui/button';

const ProductCard = () => {
    return (
        <div className="relative group w-64 mx-auto text-center cursor-pointer">
            {/* Logo */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
                <h2 className="text-xs font-bold text-gray-900 bg-white px-2 py-1 rounded">
                    <span className="text-white bg-black px-1">VOC</span>
                    <span className="text-yellow-400"> RECORDS</span>
                </h2>
            </div>

            {/* Product Image */}
            <div className="relative">
                <img
                    src="https://vocrecords.vn/wp-content/uploads/2023/05/MOIV0154-800x800.jpg"
                    alt="Vinyl Record"
                    className="w-full rounded shadow-lg"
                />
            </div>

            {/* Hover Buttons */}
            <div className="absolute inset-0 flex mt-28 justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="bg-white px-4 flex items-center space-x-2 hover:bg-gray-100 rounded-none border-[1px] border-black hover:border-black shadow-[4px_4px_0px_#000000]">
                    <FaHeart className="text-gray-600" />
                </Button>

                <Button className="bg-[#FFF27E] hover:bg-[#FFF27E] border-[1px] border-black hover:border-black px-2 flex items-center rounded-none shadow-[4px_4px_0px_#000000]">
                    <FaShoppingBag className="text-black" />
                    <span className="text-black text-[10px]">THÊM VÀO GIỎ HÀNG</span>
                </Button>
            </div>

            {/* Product Details */}
            <div className="mt-4">
                <p className="text-gray-500">25</p> {/* Album Name */}
                <h3 className="text-lg font-bold">Adele</h3> {/* Artist */}
                <p className="text-xl font-bold text-gray-900">960,000 ₫</p> {/* Price */}
                {/* Stock & Size */}
                <div className="flex justify-center mt-2 space-x-2">
                    <span className="bg-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded">CÒN HÀNG</span>
                    <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded">M</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
