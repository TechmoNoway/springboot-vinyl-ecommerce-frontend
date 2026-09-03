import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "@/components/shared/ProductList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/services/CategoryService";
import {
  getAllProductsFilteredAndSorted,
  getReadyProducts,
} from "@/services/ProductService";
import { ICategoryList, IProduct } from "types";
import {
  Filter,
  SlidersHorizontal,
  X,
  Disc3,
  RotateCcw,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";

const STUDIO_NAMES = [
  "SONY MUSIC",
  "UNIVERSAL MUSIC GROUP",
  "WARNER MUSIC",
  "COLUMBIA",
  "MUSIC ON VINYL",
  "ISLAND RECORDS",
  "BLUE NOTE",
  "ATLANTIC",
  "VIRGIN RECORDS",
];

const MANUFACTURE_YEARS = [
  "2024", "2023", "2022", "2020", "2015", "2010",
  "2000", "1990", "1980", "1970", "1960"
];

const STOCK_STATUS_LIST = [
  { value: "CÒN HÀNG", label: "Còn hàng sẵn" },
  { value: "PREORDER", label: "Pre-order" },
  { value: "ĐANG VỀ", label: "Đang về tiệm" },
];

const PLATFORMS = [
  { value: "ĐĨA MỚI", label: "Đĩa Than Mới (New Vinyl)" },
  { value: "ĐĨA VINTAGE", label: "Đĩa Than Vintage (Pre-owned)" },
  { value: "CASSETTE", label: "Băng Cassette" },
  { value: "7INCH SINGLE", label: "Đĩa 7-inch Single" },
];

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters from URL or default
  const titleParam = searchParams.get("title") || "";
  const categoryParam = searchParams.get("category") || "";
  const platformParam = searchParams.get("platform") || "";
  const stockStatusParam = searchParams.get("stockStatus") || "";
  const studioNameParam = searchParams.get("studioName") || "";
  const yearParam = searchParams.get("manufactureYear") || "";
  const sortParam = searchParams.get("sortType") || "DEFAULT";

  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategoryList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        const data = res?.data?.data || res?.data || [];
        setCategories(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load categories:", e);
      }
    };
    fetchCategories();
  }, []);

  // Update a single filter query param
  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === "ALL" || value === "DEFAULT") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    setMaxPrice(10000000);
    setCurrentPage(1);
  };

  // Fetch Products with filters & smart client fallback
  const handleGetProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllProductsFilteredAndSorted(
        titleParam || null,
        categoryParam || null,
        platformParam || null,
        stockStatusParam || null,
        studioNameParam || null,
        yearParam || null,
        null,
        sortParam
      );

      let data: IProduct[] = res?.data?.data || res?.data || [];
      if (!Array.isArray(data)) data = [];

      // Smart fallback: If backend returns 0 products for a specific category/search term,
      // fetch all products and match against mood, description, artist, platform, and title
      if (data.length === 0 && (categoryParam || titleParam || platformParam)) {
        try {
          const allRes = await getReadyProducts();
          const allData: IProduct[] = allRes?.data?.data || allRes?.data || [];
          if (Array.isArray(allData) && allData.length > 0) {
            const term = (categoryParam || titleParam || "").toLowerCase().trim();
            const plat = (platformParam || "").toLowerCase().trim();

            data = allData.filter((p) => {
              let matchCat = true;
              if (term) {
                matchCat = Boolean(
                  (p.mood && p.mood.toLowerCase().includes(term)) ||
                  (p.artist && p.artist.toLowerCase().includes(term)) ||
                  (p.title && p.title.toLowerCase().includes(term)) ||
                  (p.description && p.description.toLowerCase().includes(term)) ||
                  (p.categories && p.categories.some((c) => (c.categoryName || "").toLowerCase().includes(term)))
                );
              }
              let matchPlat = true;
              if (plat) {
                matchPlat = Boolean(p.platform && p.platform.toLowerCase().includes(plat));
              }
              return matchCat && matchPlat;
            });
          }
        } catch {
          // ignore fallback error
        }
      }

      // Filter by max price client-side if changed
      if (maxPrice < 10000000) {
        data = data.filter((p) => p.price <= maxPrice);
      }

      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
      // If API fails, try getReadyProducts
      try {
        const fallbackRes = await getReadyProducts();
        const fallbackData = fallbackRes?.data?.data || fallbackRes?.data || [];
        setProducts(Array.isArray(fallbackData) ? fallbackData : []);
      } catch {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  }, [
    titleParam,
    categoryParam,
    platformParam,
    stockStatusParam,
    studioNameParam,
    yearParam,
    sortParam,
    maxPrice,
  ]);

  useEffect(() => {
    handleGetProducts();
  }, [handleGetProducts]);

  // Paging calculations
  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header Banner */}
      <FadeIn direction="up" className="bg-[#13151A] text-white rounded-xl p-6 sm:p-10 mb-8 border border-amber-500/30 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Disc3 className="w-4 h-4 animate-spin-slow" />
            <span>Kho Đĩa Than & Âm Thanh Analog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white uppercase tracking-tight">
            {platformParam || categoryParam || (titleParam ? `Kết Quả: "${titleParam}"` : "Bộ Sưu Tập Đĩa Than")}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            Tìm thấy <b>{products.length}</b> tựa đĩa than và băng cassette nguyên bản sẵn sàng giao tới tận tay bạn.
          </p>
        </div>

        {/* Vinyl Graphic in Background */}
        <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
          <Disc3 className="w-64 h-64 text-amber-400" />
        </div>
      </FadeIn>

      {/* Main Content Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white border-2 border-zinc-900 rounded-lg p-5 shadow-retro space-y-6">
            
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wide text-zinc-900">
                <Filter className="w-4 h-4 text-amber-500" />
                <span>Bộ Lọc Đĩa Than</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-zinc-500 hover:text-black flex items-center gap-1 font-semibold"
                title="Xóa tất cả bộ lọc"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại</span>
              </button>
            </div>

            {/* Platform / Format */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                Định Dạng (Format)
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => handleFilterChange("platform", "ALL")}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded font-medium transition-colors ${
                    !platformParam ? "bg-[#13151A] text-amber-400 font-bold" : "hover:bg-zinc-100 text-zinc-700"
                  }`}
                >
                  Tất cả định dạng
                </button>
                {PLATFORMS.map((plat) => (
                  <button
                    key={plat.value}
                    onClick={() => handleFilterChange("platform", plat.value)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded font-medium transition-colors ${
                      platformParam === plat.value
                        ? "bg-[#13151A] text-amber-400 font-bold"
                        : "hover:bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {plat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category / Thể loại */}
            <div className="space-y-2 border-t border-zinc-100 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                Thể Loại Nhạc
              </label>
              <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                <button
                  onClick={() => handleFilterChange("category", "ALL")}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded font-medium transition-colors ${
                    !categoryParam ? "bg-[#13151A] text-amber-400 font-bold" : "hover:bg-zinc-100 text-zinc-700"
                  }`}
                >
                  Tất cả thể loại
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id || cat.name}
                    onClick={() => handleFilterChange("category", cat.name)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded font-medium transition-colors ${
                      categoryParam === cat.name
                        ? "bg-[#13151A] text-amber-400 font-bold"
                        : "hover:bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Manufacture Year / Thập niên */}
            <div className="space-y-2 border-t border-zinc-100 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                Năm Phát Hành
              </label>
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                <button
                  onClick={() => handleFilterChange("manufactureYear", "ALL")}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded font-medium transition-colors ${
                    !yearParam ? "bg-[#13151A] text-amber-400 font-bold" : "hover:bg-zinc-100 text-zinc-700"
                  }`}
                >
                  Tất cả các năm
                </button>
                {MANUFACTURE_YEARS.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => handleFilterChange("manufactureYear", yr)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded font-medium transition-colors ${
                      yearParam === yr
                        ? "bg-[#13151A] text-amber-400 font-bold"
                        : "hover:bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    Năm {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2 border-t border-zinc-100 pt-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase text-zinc-800">
                <span>Khoảng Giá Tối Đa</span>
                <span className="text-amber-700">{maxPrice.toLocaleString()} ₫</span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Stock Status */}
            <div className="space-y-2 border-t border-zinc-100 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                Tình Trạng Kho
              </label>
              <div className="space-y-1">
                {STOCK_STATUS_LIST.map((st) => (
                  <button
                    key={st.value}
                    onClick={() => handleFilterChange("stockStatus", stockStatusParam === st.value ? "ALL" : st.value)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded font-medium transition-colors ${
                      stockStatusParam === st.value
                        ? "bg-[#13151A] text-amber-400 font-bold"
                        : "hover:bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Record Label / Studio */}
            <div className="space-y-2 border-t border-zinc-100 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                Hãng Phát Hành (Label)
              </label>
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                {STUDIO_NAMES.map((studio) => (
                  <button
                    key={studio}
                    onClick={() => handleFilterChange("studioName", studioNameParam === studio ? "ALL" : studio)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded font-medium transition-colors ${
                      studioNameParam === studio
                        ? "bg-[#13151A] text-amber-400 font-bold"
                        : "hover:bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {studio}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Main Product Grid Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Controls Bar: Mobile Filter Toggle + Active Filters + Sorting */}
          <div className="bg-white border border-zinc-200 rounded-lg p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden bg-[#13151A] text-white px-4 py-2 rounded text-xs font-bold uppercase flex items-center gap-2 shadow-retro-sm transition-transform active:scale-95"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Bộ Lọc</span>
            </button>

            {/* Active filter pills summary with AnimatePresence */}
            <div className="hidden sm:flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-zinc-500 font-medium">Bộ lọc đang bật:</span>
              <AnimatePresence>
                {platformParam && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
                  >
                    {platformParam}
                    <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => handleFilterChange("platform", "ALL")} />
                  </motion.span>
                )}
                {categoryParam && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
                  >
                    {categoryParam}
                    <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => handleFilterChange("category", "ALL")} />
                  </motion.span>
                )}
                {stockStatusParam && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
                  >
                    {stockStatusParam}
                    <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => handleFilterChange("stockStatus", "ALL")} />
                  </motion.span>
                )}
              </AnimatePresence>
              {!platformParam && !categoryParam && !stockStatusParam && (
                <span className="text-zinc-400 italic">Tất cả sản phẩm</span>
              )}
            </div>

            {/* Sorting Select */}
            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-xs font-bold uppercase text-zinc-600 hidden md:inline">
                Sắp xếp:
              </span>
              <Select
                value={sortParam}
                onValueChange={(val) => handleFilterChange("sortType", val)}
              >
                <SelectTrigger className="w-48 bg-white border border-zinc-300 rounded text-xs font-semibold focus:ring-0">
                  <SelectValue placeholder="Thứ tự mặc định" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEFAULT">Thứ tự mặc định</SelectItem>
                  <SelectItem value="ASC">Giá: Thấp đến Cao</SelectItem>
                  <SelectItem value="DESC">Giá: Cao đến Thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products View */}
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-3">
              <ClipLoader size={36} color="#E5A93C" />
              <p className="text-xs font-semibold text-zinc-500">
                Đang tìm đĩa than trong kho...
              </p>
            </div>
          ) : (
            <div>
              <ProductList products={currentProducts} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((prev) => Math.max(prev - 1, 1));
                          }}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            isActive={index + 1 === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(index + 1);
                            }}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filters Drawer with AnimatePresence & Swipe In from Left */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setMobileFilterOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto space-y-6 z-10"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <span className="font-bold text-sm uppercase">Bộ Lọc Đĩa Than</span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 hover:bg-zinc-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Platform */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase">Định Dạng</label>
                {PLATFORMS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => {
                      handleFilterChange("platform", p.value);
                      setMobileFilterOpen(false);
                    }}
                    className="w-full text-left text-xs py-1.5 text-zinc-700 hover:text-black font-medium"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Categories */}
              <div className="space-y-2 border-t pt-4">
                <label className="text-xs font-bold uppercase">Thể Loại Nhạc</label>
                {categories.map((c) => (
                  <button
                    key={c.id || c.name}
                    onClick={() => {
                      handleFilterChange("category", c.name);
                      setMobileFilterOpen(false);
                    }}
                    className="w-full text-left text-xs py-1.5 text-zinc-700 hover:text-black font-medium"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Shop;
