import ProductList from '@/components/shared/ProductList';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllCategories } from '@/services/CategoryService';
import { getAllProductsFilteredAndSorted } from '@/services/ProductService';
import { useEffect, useState } from 'react';
import { ICategory, IProduct } from 'types';

const STUDIO_NAMES = [
    'SONY_MUSIC',
    'HANSA',
    'MUSIC ON VINYL',
    'EVOSOUND',
    'CLEOPATRA',
    'COLUMBIA',
    'ISLAND RECORDS',
    'UNIVERSAL MUSIC GROUP',
];

const MANUFACTURE_YEARS = [
    2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003,
    2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984,
    1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965,
    1964, 1963, 1962, 1961, 1960,
];

const Shop = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [state, setState] = useState({
        priceRange: [0, 24900000],
        currentPage: 1,
        itemsPerPage: 30,
        products: [],
        title: '',
        category: '',
        platform: '',
        stockStatus: '',
        studioName: '',
        manufactureYear: '',
        status: '',
        sortType: 'DEFAULT',
    });
    const [categories, setCategories] = useState<ICategory[]>([]);

    const handleGetProducts = async () => {
        const response = await getAllProductsFilteredAndSorted(
            state.title,
            state.category,
            state.platform,
            state.stockStatus,
            state.studioName,
            state.manufactureYear,
            state.status,
            state.sortType,
        );

        const currentProducts = response?.data.data.slice(
            (state.currentPage - 1) * state.itemsPerPage,
            state.currentPage * state.itemsPerPage,
        );

        setProducts(currentProducts);
    };

    const handleGetCategories = async () => {
        const response = await getAllCategories();

        setCategories(response?.data.data);
    };

    const totalPages = Math.ceil(products.length / state.itemsPerPage);

    const handlePageChange = (page: number) => {
        setState((prevState) => ({
            ...prevState,
            currentPage: page,
        }));
    };

    useEffect(() => {
        handleGetProducts();
    }, [
        state.currentPage,
        state.itemsPerPage,
        state.sortType,
        state.title,
        state.category,
        state.platform,
        state.stockStatus,
        state.studioName,
        state.manufactureYear,
        state.status,
    ]);

    useEffect(() => {
        handleGetCategories();
    }, []);

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
                        {categories.map((item, index) => (
                            <SelectItem value={item.categoryName} key={index}>
                                {item.categoryName}
                            </SelectItem>
                        ))}
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
                        {MANUFACTURE_YEARS.map((item, index) => (
                            <SelectItem key={index} value={item.toString()}>
                                {item}
                            </SelectItem>
                        ))}
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
                        {STUDIO_NAMES.map((item, index) => (
                            <SelectItem key={index} value={item}>
                                Light
                            </SelectItem>
                        ))}
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
                    value={state.priceRange[1]}
                    onChange={(e) =>
                        setState((prevState) => ({
                            ...prevState,
                            priceRange: [0, Number(e.target.value)],
                        }))
                    }
                    className="w-[700px] accent-yellow-500"
                />
                <span className="font-bold">{state.priceRange[1].toLocaleString()} đ</span>
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
                            <SelectItem value="DEFAULT">THỨ TỰ MẶC ĐỊNH</SelectItem>
                            <SelectItem value="DESC">GIÁ (TĂNG DẦN)</SelectItem>
                            <SelectItem value="ASC">GIÁ (GIẢM DẦN)</SelectItem>
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
                            <SelectItem
                                value="30"
                                onClick={() => setState((prevState) => ({ ...prevState, itemsPerPage: 30 }))}
                            >
                                30
                            </SelectItem>
                            <SelectItem
                                value="60"
                                onClick={() => setState((prevState) => ({ ...prevState, itemsPerPage: 60 }))}
                            >
                                60
                            </SelectItem>
                            <SelectItem
                                value="90"
                                onClick={() => setState((prevState) => ({ ...prevState, itemsPerPage: 90 }))}
                            >
                                90
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <button className="border p-2 bg-gray-200">🔲</button>
                </div>
            </div>

            {/* Product Grid */}
            <ProductList products={products} type="Horizontal" />

            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            className="text-base"
                            onClick={() => handlePageChange(Math.max(state.currentPage - 1, 1))}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                className="text-base"
                                isActive={index + 1 === state.currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            className="text-base"
                            onClick={() => handlePageChange(Math.min(state.currentPage + 1, totalPages))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default Shop;
