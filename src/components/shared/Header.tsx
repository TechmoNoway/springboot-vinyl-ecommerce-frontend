import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchProductsByTitle } from "@/services/ProductService";
import { IProduct } from "types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Disc3,
  Menu,
  X,
  LogOut,
  Package,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

const Header: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { totalItems, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, token, isAdmin, logoutWithNavigate } = useAuth();

  // Handle live search
  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await searchProductsByTitle(searchInput);
        const data = response?.data?.data || response?.data || [];
        setSearchResults(Array.isArray(data) ? data.slice(0, 5) : []);
        setIsListVisible(true);
      } catch (e) {
        console.error("Search error:", e);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsListVisible(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (title: string) => {
    setIsListVisible(false);
    setSearchInput("");
    navigate(`/product/${encodeURIComponent(title)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setIsListVisible(false);
      navigate(`/product-category/vinyl?title=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121316]/95 backdrop-blur-md border-b border-zinc-800 text-white transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black text-[11px] font-bold py-1 px-4 text-center tracking-wider uppercase flex items-center justify-center gap-2">
        <span>✨ Freeship đơn từ 1.000.000đ</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">100% Đĩa than & Băng Cassette Chính Hãng</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden md:inline">Hotline: 090 133 8619</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center border-2 border-amber-500/80 shadow-md"
          >
            <Disc3 className="w-6 h-6 text-amber-400 animate-spin-slow" />
            <div className="absolute w-2 h-2 bg-amber-400 rounded-full"></div>
          </motion.div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-extrabold text-2xl tracking-tight text-white font-display">
                33
              </span>
              <span className="font-bold text-2xl tracking-tight text-amber-400 font-display ml-1">
                RPM
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 -mt-1 font-semibold">
              Analog & Vinyl Shop
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
          <Link
            to="/product-category/vinyl"
            className="text-zinc-200 hover:text-amber-400 transition-colors py-2 border-b-2 border-transparent hover:border-amber-400"
          >
            Đĩa Than
          </Link>
          <Link
            to="/product-category/vinyl?platform=ĐĨA%20VINTAGE"
            className="text-zinc-200 hover:text-amber-400 transition-colors py-2 border-b-2 border-transparent hover:border-amber-400"
          >
            Đĩa Vintage
          </Link>
          <Link
            to="/product-category/vinyl?platform=CASSETTE"
            className="text-zinc-200 hover:text-amber-400 transition-colors py-2 border-b-2 border-transparent hover:border-amber-400"
          >
            Cassette Zone
          </Link>
          <Link
            to="/product-category/vinyl?category=Phụ%20kiện"
            className="text-zinc-200 hover:text-amber-400 transition-colors py-2 border-b-2 border-transparent hover:border-amber-400"
          >
            Mâm Đĩa & Phụ Kiện
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-amber-400 hover:text-amber-300 font-extrabold flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/30"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Hub</span>
            </Link>
          )}
        </nav>

        {/* Search Bar with live dropdown */}
        <div
          ref={searchContainerRef}
          className="relative hidden md:flex items-center flex-1 max-w-xs xl:max-w-md mx-2"
        >
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Tìm bài hát, album, nghệ sĩ..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setIsListVisible(true);
                }}
                className="w-full bg-zinc-900/90 text-zinc-100 text-xs rounded-full pl-9 pr-8 py-2.5 border border-zinc-700/80 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder:text-zinc-500 transition-all"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
              {isSearching ? (
                <Disc3 className="w-4 h-4 text-amber-400 absolute right-3 animate-spin" />
              ) : searchInput ? (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          </form>

          {/* Search Dropdown Suggestion with AnimatePresence */}
          <AnimatePresence>
            {isListVisible && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-12 left-0 right-0 bg-[#1A1D24] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-2 border-b border-zinc-800 text-[11px] font-semibold text-zinc-400 flex justify-between">
                  <span>Gợi ý tìm kiếm</span>
                  <span className="text-amber-400 cursor-pointer hover:underline" onClick={handleSearchSubmit}>
                    Xem tất cả kết quả &gt;
                  </span>
                </div>
                <ul className="divide-y divide-zinc-800">
                  {searchResults.map((item) => (
                    <motion.li
                      key={item.id}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      onClick={() => handleSelectProduct(item.title)}
                      className="p-2.5 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <img
                        src={item.posterUrl}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {item.artist || "Đĩa than"}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-amber-400 flex-shrink-0">
                        {item.price?.toLocaleString()} ₫
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Actions: Wishlist, Cart, Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Wishlist Link */}
          <Link
            to="/account/wishlist"
            className="relative p-2 text-zinc-300 hover:text-amber-400 transition-colors rounded-full hover:bg-zinc-800"
            title="Danh sách yêu thích"
          >
            <Heart className="w-5 h-5" />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Cart Trigger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={openDrawer}
            className="relative p-2 text-zinc-300 hover:text-amber-400 transition-colors rounded-full hover:bg-zinc-800 flex items-center"
            title="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-amber-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* User Profile Dropdown */}
          <div ref={userDropdownRef} className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center space-x-1.5 p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-zinc-700"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-black font-extrabold text-xs">
                {currentUser?.fullname ? currentUser.fullname.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 hidden sm:block transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-12 w-56 bg-[#1A1D24] border border-zinc-700 rounded-xl shadow-2xl py-2 z-50 text-xs"
                >
                  {token ? (
                    <>
                      <div className="px-4 py-2 border-b border-zinc-800">
                        <p className="font-bold text-white truncate">
                          {currentUser.fullname || "Người yêu đĩa than"}
                        </p>
                        <p className="text-zinc-400 text-[11px] truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      <Link
                        to="/account/details"
                        onClick={() => setUserDropdownOpen(false)}
                        className="px-4 py-2.5 hover:bg-zinc-800 flex items-center gap-2.5 text-zinc-200 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4 text-amber-400" />
                        <span>Thông tin tài khoản</span>
                      </Link>

                      <Link
                        to="/account/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="px-4 py-2.5 hover:bg-zinc-800 flex items-center gap-2.5 text-zinc-200 hover:text-white transition-colors"
                      >
                        <Package className="w-4 h-4 text-amber-400" />
                        <span>Lịch sử đơn hàng</span>
                      </Link>

                      <Link
                        to="/account/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="px-4 py-2.5 hover:bg-zinc-800 flex items-center gap-2.5 text-zinc-200 hover:text-white transition-colors"
                      >
                        <Heart className="w-4 h-4 text-amber-400" />
                        <span>Đĩa than yêu thích</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="px-4 py-2.5 hover:bg-zinc-800 flex items-center gap-2.5 text-amber-400 font-bold border-t border-zinc-800 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <span>Bảng Quản Trị (Admin)</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logoutWithNavigate();
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-red-950/40 text-red-400 flex items-center gap-2.5 border-t border-zinc-800 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </>
                  ) : (
                    <div className="p-3 text-center space-y-2">
                      <p className="text-zinc-300 font-medium">Chào mừng bạn đến với 33 RPM!</p>
                      <Link
                        to="/login-signup"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full bg-amber-400 hover:bg-amber-300 text-black py-2 rounded-md font-bold text-xs uppercase"
                      >
                        Đăng Nhập / Đăng Ký
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[#121316] border-b border-zinc-800 p-4 space-y-4 overflow-hidden"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm đĩa than, nghệ sĩ..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-zinc-900 text-zinc-100 text-xs rounded-lg pl-9 pr-4 py-2.5 border border-zinc-700"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
            </form>

            <nav className="flex flex-col space-y-2 text-sm font-bold uppercase">
              <Link
                to="/product-category/vinyl"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-zinc-800 text-zinc-200"
              >
                Đĩa Than
              </Link>
              <Link
                to="/product-category/vinyl?platform=ĐĨA%20VINTAGE"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-zinc-800 text-zinc-200"
              >
                Đĩa Vintage
              </Link>
              <Link
                to="/product-category/vinyl?platform=CASSETTE"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-zinc-800 text-zinc-200"
              >
                Cassette Zone
              </Link>
              <Link
                to="/product-category/vinyl?category=Phụ%20kiện"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-zinc-800 text-zinc-200"
              >
                Mâm Đĩa & Phụ Kiện
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded bg-amber-400/10 text-amber-400 font-bold flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Hub</span>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
