import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "types";
import { getReadyProducts } from "@/services/ProductService";
import ProductCard from "./ProductCard";
import { Disc3, ArrowRight, Sparkles } from "lucide-react";

const ReadyVinylList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getReadyProducts();
        const data = res?.data?.data || res?.data || [];
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load ready vinyl list:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (activeTab === "IN_STOCK") {
      return (
        !p.stockStatus ||
        p.stockStatus.toLowerCase().includes("còn") ||
        p.stockQuantity > 0
      );
    }
    if (activeTab === "VINTAGE") {
      return (
        p.platform?.toLowerCase().includes("vintage") ||
        (p.manufactureYear && Number(p.manufactureYear) < 2000)
      );
    }
    if (activeTab === "CASSETTE") {
      return p.platform?.toLowerCase().includes("cassette");
    }
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header with Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-zinc-900 pb-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-amber-600 font-extrabold text-xs tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tuyển Chọn Độc Quyền Tại Tiệm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 font-display uppercase tracking-tight">
            Đĩa Than Sẵn Hàng Tại Kệ
          </h2>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase transition-all ${
              activeTab === "ALL"
                ? "bg-[#13151A] text-amber-400 shadow-retro-sm"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
            }`}
          >
            Tất Cả ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("IN_STOCK")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase transition-all ${
              activeTab === "IN_STOCK"
                ? "bg-[#13151A] text-amber-400 shadow-retro-sm"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
            }`}
          >
            Có Sẵn Lấy Ngay
          </button>
          <button
            onClick={() => setActiveTab("VINTAGE")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase transition-all ${
              activeTab === "VINTAGE"
                ? "bg-[#13151A] text-amber-400 shadow-retro-sm"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
            }`}
          >
            Đĩa Xưa Vintage
          </button>
          <button
            onClick={() => setActiveTab("CASSETTE")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase transition-all ${
              activeTab === "CASSETTE"
                ? "bg-[#13151A] text-amber-400 shadow-retro-sm"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
            }`}
          >
            Băng Cassette
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-zinc-200 rounded-lg p-3 space-y-3 animate-pulse"
            >
              <div className="w-full aspect-square bg-zinc-200 rounded"></div>
              <div className="h-4 bg-zinc-200 rounded w-3/4"></div>
              <div className="h-3 bg-zinc-200 rounded w-1/2"></div>
              <div className="h-8 bg-zinc-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-zinc-300 rounded-lg p-8">
          <Disc3 className="w-12 h-12 text-zinc-400 mx-auto animate-spin-slow mb-3" />
          <h3 className="text-base font-bold text-zinc-800">
            Không tìm thấy sản phẩm trong danh mục này
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Vui lòng thử lại với bộ lọc khác hoặc xem toàn bộ danh mục của tiệm.
          </p>
          <button
            onClick={() => setActiveTab("ALL")}
            className="mt-4 bg-[#13151A] text-amber-300 px-5 py-2 text-xs font-bold uppercase"
          >
            Xem Tất Cả Đĩa
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Explore More CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/product-category/vinyl")}
          className="inline-flex items-center gap-2 bg-[#13151A] hover:bg-black text-amber-400 font-extrabold text-sm uppercase px-8 py-4 rounded-none shadow-retro hover:shadow-retro-lg transition-all active:translate-x-0.5 active:translate-y-0.5 border border-black"
        >
          <span>Khám Phá Toàn Bộ Đĩa Than Của Tiệm</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};

export default ReadyVinylList;
