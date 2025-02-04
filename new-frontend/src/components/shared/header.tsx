import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ChangeEvent, useEffect, useState } from 'react';
import { searchProductsByTitle } from '@/services/ProductService';
import { IProduct } from 'types';

const Header = () => {
    const [opacity, setOpacity] = useState(1);
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchResults, setSearchResults] = useState<IProduct[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const newOpacity = Math.max(1 - scrollTop / 200, 0.85);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith(' ')) {
            return;
        }
        setSearchInput(value);
        if (value.length > 0) {
            const response = await searchProductsByTitle(value);
            console.log(response?.data.data);
            setSearchResults(response?.data.data);
        } else {
            setSearchResults([]);
        }
    };
    return (
        <>
            <header
                className="bg-[#121416] dark:bg-gray-900 sticky top-0 z-20 transition-opacity duration-300"
                style={{ opacity }}
            >
                <div className="max-w-screen-xl h-24 flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={'/'} className="flex items-center">
                        <img
                            src="https://vocrecords.vn/wp-content/uploads/2020/10/Logo_ngang.png"
                            alt=""
                            className="w-[151x] h-[25px]"
                        />
                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <nav className="hidden md:flex space-x-6 text-sm uppercase font-semibold">
                            <a href="#" className="text-white hover:text-yellow-300 text-[15px] font-semibold">
                                Đĩa Than
                            </a>
                            <a href="#" className="text-white hover:text-yellow-300 text-[15px] font-semibold">
                                Mâm Đĩa
                            </a>
                            <a href="#" className="text-white hover:text-yellow-300 text-[15px] font-semibold">
                                Cho Người Mới
                            </a>

                            <a href="#" className="text-white hover:text-yellow-300 text-[15px] font-semibold">
                                Blog
                            </a>
                        </nav>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center border-b border-gray-400 h-9">
                            <input
                                type="text"
                                placeholder="Tìm tên bài hát, album, nghệ sĩ..."
                                onChange={handleSearchChange}
                                value={searchInput}
                                className="bg-transparent text-sm outline-none placeholder:text-xs placeholder-gray-500 hidden lg:block text-white md:w-[283px] px-3"
                            />
                            {searchResults.length > 0 && (
                                <div className="absolute right-96 top-20 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 w-40">
                                    <ul>
                                        {searchResults.map((product, index) => (
                                            <li key={index} className="p-2 hover:bg-gray-100">
                                                {product?.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Icons */}
                            <Button className="bg-transparent hover:bg-transparent border-none">
                                <FaSearch className="text-white cursor-pointer" />
                            </Button>
                        </div>
                        <div className="relative">
                            <FaShoppingCart className="text-white cursor-pointer w-5 h-5" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                                0
                            </span>
                        </div>
                        <FaUser className="text-white cursor-pointer w-5 h-5" />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
