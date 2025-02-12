import ProductList from '@/components/shared/ProductList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const Shop = () => {
    const [priceRange, setPriceRange] = useState([0, 24900000]);

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
            <div className="mt-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                <Select>
                    <SelectTrigger className="px-3 py-6 border w-full rounded-none">
                        <SelectValue placeholder="THỂ LOẠI" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="px-3 py-6 border w-full rounded-none">
                        <SelectValue placeholder="ĐỊNH DẠNG" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="px-3 py-6 border w-full rounded-none">
                        <SelectValue placeholder="THỜI KỲ" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="px-3 py-6 border w-full rounded-none">
                        <SelectValue placeholder="TÌNH TRẠNG KHO" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="px-3 py-6 border w-full rounded-none">
                        <SelectValue placeholder="HÃNG PHÁT HÀNH" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="px-3 py-6 border w-full rounded-none">
                        <SelectValue placeholder="TÂM TRẠNG" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="px-3 py-6 border w-full rounded-none">
                        <SelectValue placeholder="PHÁT HÀNH" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="px-3 py-6 border w-full rounded-none">
                        <SelectValue placeholder="TÌNH TRẠNG ĐĨA" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
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
                    className="w-[700px] accent-yellow-500"
                />
                <span className="font-bold">{priceRange[1].toLocaleString()} đ</span>
            </div>

            {/* Sorting and View Controls */}
            <div className="flex justify-between items-center mt-6">
                <div className="flex items-center">
                    <p className="font-semibold w-44 text-sm">SẮP XẾP BỞI:</p>
                    <Select>
                        <SelectTrigger className="py-2 border border-black hover:border-black rounded-none">
                            <SelectValue placeholder="THỨ TỰ MẶC ĐỊNH" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">THỨ TỰ MẶC ĐỊNH</SelectItem>
                            <SelectItem value="desc">GIÁ (TĂNG DẦN)</SelectItem>
                            <SelectItem value="asc">GIÁ (GIẢM DẦN)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold w-16">HIỂN THỊ:</span>
                    <Select>
                        <SelectTrigger className="border w-16 border-black hover:border-black rounded-none">
                            <SelectValue placeholder="30" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="60">60</SelectItem>
                            <SelectItem value="90">90</SelectItem>
                        </SelectContent>
                    </Select>
                    <button className="border p-2 bg-gray-200">🔲</button>
                </div>
            </div>

            {/* Product Grid */}
            <ProductList type="Horizontal" />
        </div>
    );
};

export default Shop;
