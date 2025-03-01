import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { searchProductsByTitle } from "@/services/ProductService";
import { IProduct } from "types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useCart } from "@/context/CartContext";
import { ShoppingBasket } from "lucide-react";
// import useDebounce from '@/hooks/useDebounce';

const Header = () => {
  const [opacity, setOpacity] = useState(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isListVisible, setIsListVisible] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const { cart } = useCart();

  // const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newOpacity = Math.max(1 - scrollTop / 200, 0.9);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      listRef.current &&
      !listRef.current.contains(event.target as Node)
    ) {
      setIsListVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.startsWith(" ")) {
      return;
    }
    setSearchInput(value);
    if (value.length > 0) {
      const response = await searchProductsByTitle(value);
      setSearchResults(response?.data.data);
    } else {
      setSearchResults([]);
    }
  };

  const handleFocus = () => {
    setIsListVisible(true);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <header
        className="bg-[#121416] dark:bg-gray-900 sticky top-0 z-20 transition-opacity duration-300"
        style={{ opacity }}
      >
        <div className="max-w-screen-xl h-24 flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/"} className="flex items-center">
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
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-default"
          >
            <nav className="hidden md:flex space-x-6 text-sm uppercase font-semibold">
              <Link
                to={"/product-category/vinyl"}
                className="text-white hover:text-yellow-300 text-[15px] font-semibold"
              >
                Đĩa Than
              </Link>
              <a
                href="#"
                className="text-white hover:text-yellow-300 text-[15px] font-semibold"
              >
                Mâm Đĩa
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-300 text-[15px] font-semibold"
              >
                Cho Người Mới
              </a>

              <a
                href="#"
                className="text-white hover:text-yellow-300 text-[15px] font-semibold"
              >
                Blog
              </a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center border-b border-gray-400 h-9">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Tìm tên bài hát, album, nghệ sĩ..."
                  onChange={handleSearchChange}
                  value={searchInput}
                  onFocus={handleFocus}
                  className="bg-transparent text-sm outline-none placeholder:text-xs placeholder-gray-500 hidden lg:block text-white md:w-[350px] px-3"
                />
                {searchResults?.length > 0 && isListVisible && (
                  <div className="absolute top-20 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 max-w-[530px] transition-opacity duration-300 animate-fadeIn">
                    <ul ref={listRef}>
                      {searchResults.map((product, index) => (
                        <Link
                          to={`/product/${product.title}`}
                          key={index}
                          className="px-3 py-3 flex hover:bg-gray-100 w-full space-x-5"
                          onClick={() => setIsListVisible(false)}
                        >
                          <img
                            src={product.posterUrl}
                            alt=""
                            className="h-24"
                          />
                          <div className="flex flex-col items-end w-full">
                            <p className="font-semibold text-black">
                              {product?.title}
                            </p>
                            <p className="text-gray-500">
                              {product?.artist}
                            </p>
                            <p className="font-bold text-black">
                              {product.price.toLocaleString("en-US")}{" "}
                              ₫
                            </p>
                          </div>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Icons */}
              <Button className="bg-transparent hover:bg-transparent border-none">
                <FaSearch className="text-white cursor-pointer" />
              </Button>
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <div className="relative">
                  <FaShoppingCart className="text-white cursor-pointer w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                    {cart.length}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                className="bg-white p-5 shadow-md rounded-none w-80 mt-2"
                align="end"
              >
                {/* Item Count */}
                <div className="text-gray-800 font-bold mb-3">
                  {cart.length} ITEMS
                </div>

                <hr className="border-gray-300" />

                {cart.length === 0 ? (
                  <>
                    <p>Your cart is empty.</p>
                  </>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <div key={index}>
                        {/* Product Info */}
                        <div className="flex justify-between items-center py-3">
                          <div>
                            <p className="font-semibold">
                              {item.title}
                            </p>
                            <p className="text-gray-600">
                              {item.quantity} ×{" "}
                              {item.price.toLocaleString("en-US")} đ
                            </p>
                          </div>
                          <img
                            src={item.posterUrl}
                            alt={item.title}
                            className="w-14 h-14 object-cover"
                          />
                        </div>

                        <hr className="border-gray-300" />
                      </div>
                    ))}

                    {/* Subtotal */}
                    <div className="flex justify-between py-3">
                      <span className="font-semibold">
                        TỔNG SỐ PHỤ:
                      </span>
                      <span className="font-semibold">
                        {totalPrice.toLocaleString("en-US")} đ
                      </span>
                    </div>

                    {/* Buttons */}
                    <Button
                      onClick={() => navigate("/cart")}
                      className="w-full bg-white border-2 border-black py-2 font-bold mb-2 hover:bg-gray-white text-black rounded-none hover:border-black mt-4"
                    >
                      XEM GIỎ HÀNG
                    </Button>
                    <Button
                      onClick={() => navigate("/checkout")}
                      className="w-full bg-black text-white py-2 font-bold hover:bg-black rounded-none hover:border-black"
                    >
                      THANH TOÁN
                    </Button>
                  </>
                )}
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <FaUser className="text-white cursor-pointer w-5 h-5" />
              </HoverCardTrigger>
              <HoverCardContent
                className="bg-black border-none mr-4 rounded-none p-0 w-52"
                align="end"
              >
                <div className="flex items-center space-x-3 p-4 broder-b border-[1px]-white text-white hover:bg-white hover:text-black cursor-pointer">
                  <FaHeart className="w-5 h-5" />
                  <p className="uppercase font-semibold text-sm">
                    Wishlist
                  </p>
                </div>
                <div className="flex items-center space-x-3 p-4 broder-b border-[1px]-white text-white hover:bg-white hover:text-black cursor-pointer">
                  <ShoppingBasket className="w-5 h-5" />
                  <p className="uppercase font-semibold text-sm">
                    Order Checkout
                  </p>
                </div>
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-3 p-4 text-white hover:bg-white hover:text-black cursor-pointer"
                >
                  <FaUserCircle className="w-5 h-5" />
                  <p className="uppercase font-semibold text-sm">
                    Account
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
