import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IProduct } from "types";
import { getProductByTitle, getReadyProducts } from "@/services/ProductService";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { useToast } from "@/hooks/use-toast";
import VinylSpin from "@/components/shared/VinylSpin";
import ProductCard from "@/components/shared/ProductCard";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import {
  Heart,
  ShoppingBag,
  Play,
  Pause,
  Disc3,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  Radio,
  Share2,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const ProductDetail: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudioPlayer();
  const { toast } = useToast();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [isDiscExtracted, setIsDiscExtracted] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!title) return;
      setLoading(true);
      try {
        const res = await getProductByTitle(decodeURIComponent(title));
        const data = res?.data?.data || res?.data;
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
        } else if (data && !Array.isArray(data)) {
          setProduct(data);
        }

        // Fetch related products
        const relatedRes = await getReadyProducts();
        const relatedData = relatedRes?.data?.data || relatedRes?.data || [];
        if (Array.isArray(relatedData)) {
          setRelatedProducts(relatedData.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <ClipLoader size={48} color="#E5A93C" />
        <p className="text-sm font-bold uppercase tracking-wider text-zinc-600">
          Đang tải thông tin đĩa than...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <FadeIn direction="up" className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Disc3 className="w-16 h-16 text-zinc-400 mx-auto animate-spin-slow" />
        <h2 className="text-2xl font-bold font-display text-zinc-900">
          Không tìm thấy đĩa than này
        </h2>
        <p className="text-xs text-zinc-500">
          Sản phẩm có thể đã được đổi tên hoặc tạm thời hết hàng.
        </p>
        <button
          onClick={() => navigate("/product-category/vinyl")}
          className="bg-[#13151A] text-amber-300 px-6 py-3 font-bold text-xs uppercase shadow-retro"
        >
          Quay lại cửa hàng
        </button>
      </FadeIn>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isCurrentPlaying = currentTrack?.id === product.id && isPlaying;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Đã thêm vào giỏ hàng!",
      description: `${quantity}x ${product.title} đã sẵn sàng trong giỏ.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Nghe đĩa than ${product.title} - ${product.artist} tại 33 RPM!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Đã sao chép liên kết!",
        description: "Bạn có thể chia sẻ liên kết đĩa than này cho bạn bè.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb */}
      <FadeIn direction="down" className="flex items-center space-x-2 text-xs text-zinc-500 uppercase tracking-wider">
        <Link to="/" className="hover:text-black">Trang Chủ</Link>
        <span>/</span>
        <Link to="/product-category/vinyl" className="hover:text-black">Đĩa Than</Link>
        <span>/</span>
        <span className="font-bold text-zinc-900 truncate max-w-xs sm:max-w-md">
          {product.title}
        </span>
      </FadeIn>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Vinyl Sleeve & Interactive Turntable Record */}
        <FadeIn direction="right" className="lg:col-span-6 space-y-6">
          <div className="relative bg-[#1A1C22] rounded-2xl p-6 border-2 border-zinc-800 shadow-2xl overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
            
            {/* Sliding out Disc Graphic with Motion Spring */}
            <motion.div
              animate={{
                x: isDiscExtracted || isCurrentPlaying ? 130 : 0,
                rotate: isDiscExtracted || isCurrentPlaying ? 90 : 0,
                scale: isDiscExtracted || isCurrentPlaying ? 1.05 : 0.95,
              }}
              transition={{
                type: "spring",
                damping: 22,
                stiffness: 180,
                mass: 0.9,
              }}
              className="absolute z-0 cursor-pointer"
              onClick={() => setIsDiscExtracted(!isDiscExtracted)}
              title="Nhấn để rút đĩa than ra khỏi vỏ"
            >
              <VinylSpin
                posterUrl={product.posterUrl}
                isPlaying={isCurrentPlaying}
                size="xl"
              />
            </motion.div>

            {/* Sleeve Cover Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-64 sm:w-80 aspect-square rounded-lg overflow-hidden shadow-2xl border border-white/20 cursor-pointer"
              onClick={() => setIsDiscExtracted(!isDiscExtracted)}
            >
              <img
                src={product.posterUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                {isDiscExtracted ? "Chạm để thu đĩa vào" : "Chạm để rút đĩa ra"}
              </div>
            </motion.div>
          </div>

          {/* Audio Demo Player Action Card */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center flex-shrink-0 shadow-md">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-amber-950 uppercase tracking-wider">
                  Nghe Thử Audio Demo
                </p>
                <p className="text-[11px] text-amber-800">
                  {isCurrentPlaying ? "Đang phát đoạn trích từ rãnh đĩa..." : "Nghe chất âm analog ấm áp của album"}
                </p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (currentTrack?.id === product.id) {
                  togglePlay();
                } else {
                  playTrack(product);
                }
              }}
              className="bg-[#13151A] hover:bg-black text-amber-400 px-5 py-2.5 rounded-none font-bold text-xs uppercase flex items-center gap-2 shadow-retro-sm transition-colors"
            >
              {isCurrentPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Tạm Dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>Phát Demo</span>
                </>
              )}
            </motion.button>
          </div>
        </FadeIn>

        {/* Right: Album Details & Purchase Controls */}
        <FadeIn direction="left" delay={0.1} className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded uppercase">
                {product.platform || "ĐĨA THAN CHÍNH HÃNG"}
              </span>
              <button
                onClick={handleShare}
                className="text-zinc-500 hover:text-black p-1.5 rounded-full hover:bg-zinc-100 transition-colors"
                title="Chia sẻ album này"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-display text-zinc-900 mt-3 leading-tight">
              {product.title}
            </h1>
            <p className="text-base sm:text-lg font-bold text-zinc-600 mt-1">
              Nghệ sĩ: <span className="text-black">{product.artist || "Nhiều nghệ sĩ"}</span>
            </p>
          </div>

          {/* Price & Stock status */}
          <div className="flex items-center gap-4 bg-[#FAF6EE] p-4 rounded-lg border border-zinc-200">
            <span className="text-2xl sm:text-3xl font-black text-[#13151A] font-display">
              {product.price ? product.price.toLocaleString("vi-VN") : "0"} ₫
            </span>
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {product.stockStatus || "CÒN HÀNG SẴN"}
            </span>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-2">
            <p>
              {product.description ||
                "Album đĩa than nguyên bản được sản xuất với tiêu chuẩn âm thanh audiophile độ phân giải cao. Từng rãnh đĩa mang đến dải động phong phú, âm bass sâu lắng và giọng hát ấm áp đặc trưng của công nghệ analog."}
            </p>
          </div>

          {/* Quantity & Buy Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold uppercase text-zinc-700">Số lượng:</span>
              <div className="flex items-center border-2 border-zinc-900 rounded bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-zinc-700 hover:bg-zinc-100 font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-black text-zinc-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-zinc-700 hover:bg-zinc-100 font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-black py-3.5 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black shadow-retro transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>THÊM VÀO GIỎ HÀNG</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="flex-1 bg-[#13151A] hover:bg-black text-white py-3.5 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black shadow-retro transition-colors"
              >
                <span>MUA NGAY (GIAO NHANH)</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border-2 border-zinc-900 rounded-none transition-colors shadow-retro-sm ${
                  isFavorited
                    ? "bg-red-500 text-white"
                    : "bg-white hover:bg-zinc-100 text-zinc-800"
                }`}
                title={isFavorited ? "Đã lưu vào Wishlist" : "Lưu vào Wishlist"}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
              </motion.button>
            </div>
          </div>

          {/* Audiophile Vinyl Specifications */}
          <div className="pt-6 border-t-2 border-zinc-900 space-y-4">
            <h3 className="text-sm font-black font-display uppercase tracking-wider text-zinc-900 flex items-center gap-2">
              <Disc3 className="w-4 h-4 text-amber-500" />
              <span>Thông Số Kỹ Thuật Đĩa Than (Audiophile Specs)</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs bg-white p-4 border border-zinc-200 rounded-lg">
              <div className="text-zinc-500">Tốc độ quay (Speed):</div>
              <div className="font-bold text-zinc-900">{product.speed || "33 ⅓ RPM"}</div>

              <div className="text-zinc-500">Trọng lượng (Weight):</div>
              <div className="font-bold text-zinc-900">{product.weight || "180g Audiophile Vinyl"}</div>

              <div className="text-zinc-500">Năm sản xuất:</div>
              <div className="font-bold text-zinc-900">{product.manufactureYear || product.releaseYear || "2023"}</div>

              <div className="text-zinc-500">Hãng phát hành (Label):</div>
              <div className="font-bold text-zinc-900">{product.studioName || "33 RPM Imported"}</div>

              <div className="text-zinc-500">Tình trạng đĩa / vỏ:</div>
              <div className="font-bold text-emerald-700">M / Mint (Mới 100% nguyên seal)</div>

              <div className="text-zinc-500">Quốc gia xuất xứ:</div>
              <div className="font-bold text-zinc-900">{product.region || "US / UK / Japan"}</div>
            </div>
          </div>

          {/* Shipping & Packaging Assurance */}
          <div className="bg-zinc-100 rounded-lg p-4 space-y-2 text-xs text-zinc-700">
            <div className="flex items-center gap-2 font-bold text-zinc-900">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Cam kết đóng gói chuyên dụng chống cong vênh</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Mỗi đơn hàng đĩa than đều được 33 RPM bọc xốp bóng khí 3 lớp và đóng hộp carton cứng cáp chuyên dụng để bảo vệ rãnh đĩa nguyên vẹn trong suốt hành trình vận chuyển.
            </p>
          </div>

        </FadeIn>

      </div>

      {/* Related Vinyl Section */}
      {relatedProducts.length > 0 && (
        <FadeIn direction="up" className="pt-12 border-t-2 border-zinc-900 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-zinc-900">
              Có Thể Bạn Cũng Thích
            </h2>
            <Link
              to="/product-category/vinyl"
              className="text-xs font-bold text-amber-600 hover:underline uppercase"
            >
              Xem thêm đĩa khác &gt;
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <StaggerItem key={rel.id}>
                <ProductCard product={rel} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      )}

    </div>
  );
};

export default ProductDetail;
