import { useState } from 'react';

const ProductList = () => {
    const [priceRange, setPriceRange] = useState([0, 24900000]);

    const products = [
        { id: 1, title: 'LET IT BE BLUE', img: '/vinyl1.png' },
        { id: 2, title: 'LET IT BE BLUE (BLUE VINYL)', img: '/vinyl2.png' },
        { id: 3, title: 'ACTION (LP)', img: '/vinyl3.png' },
        { id: 4, title: 'X - THE GODLESS VOID', img: '/vinyl4.png' },
        { id: 5, title: 'WEIRD: THE AL YANKOVIC', img: '/vinyl5.png' },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Navigation Tabs */}
            <div className="flex space-x-8 border-b pb-3 text-lg font-bold">
                <span className="border-b-4 border-gray-800 pb-2">ĐĨA THAN</span>
                <span className="text-gray-500">MÂM ĐĨA</span>
                <span className="text-gray-500">MÁY CASSETTE</span>
                <span className="text-gray-500">PHỤ KIỆN</span>
            </div>

            {/* Banner Section */}
            <div className="bg-gray-300 h-40 flex items-center justify-center text-2xl font-bold mt-4">ĐĨA THAN</div>

            {/* Filter Section */}
            <div className="mt-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <select className="p-3 border w-full">
                    {' '}
                    <option>THỂ LOẠI</option>{' '}
                </select>
                <select className="p-3 border w-full">
                    {' '}
                    <option>ĐỊNH DẠNG</option>{' '}
                </select>
                <select className="p-3 border w-full">
                    {' '}
                    <option>THỜI KỲ</option>{' '}
                </select>
                <select className="p-3 border w-full">
                    {' '}
                    <option>TÌNH TRẠNG KHO</option>{' '}
                </select>
                <select className="p-3 border w-full">
                    {' '}
                    <option>HÃNG PHÁT HÀNH</option>{' '}
                </select>
                <select className="p-3 border w-full">
                    {' '}
                    <option>TÂM TRẠNG</option>{' '}
                </select>
                <select className="p-3 border w-full">
                    {' '}
                    <option>PHÁT HÀNH</option>{' '}
                </select>
            </div>

            {/* Price Range Slider */}
            <div className="mt-4 flex items-center space-x-4">
                <span className="font-bold">KHOẢNG GIÁ</span>
                <input
                    type="range"
                    min="0"
                    max="24900000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-yellow-500"
                />
                <span className="font-bold">{priceRange[1].toLocaleString()} đ</span>
            </div>

            {/* Sorting and View Controls */}
            <div className="flex justify-between items-center mt-6">
                <div className="flex items-center space-x-3">
                    <span className="font-bold">SẮP XẾP BỞI:</span>
                    <select className="border p-2">
                        <option>Thứ tự mặc định</option>
                    </select>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="font-bold">HIỂN THỊ:</span>
                    <select className="border p-2">
                        <option>30</option>
                    </select>
                    <button className="border p-2 bg-gray-200">🔲</button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
                {products.map((product) => (
                    <div key={product.id} className="text-center">
                        <img src={product.img} alt={product.title} className="w-full rounded-md shadow-md" />
                        <h3 className="mt-2 font-bold">{product.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
