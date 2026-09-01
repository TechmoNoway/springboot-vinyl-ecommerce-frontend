import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingBag, Play, Pause, Disc } from "lucide-react";
import VinylSpin from "./VinylSpin";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudioPlayer();
  const { toast } = useToast();

  const isCurrentPlaying = currentTrack?.id === product.id && isPlaying;
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Đã thêm vào giỏ hàng!",
      description: `${product.title} đã sẵn sàng trong giỏ hàng.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast({
      title: isFavorited ? "Đã bỏ khỏi Wishlist" : "Đã lưu vào Wishlist",
      description: product.title,
    });
  };

  const handleAudioPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentTrack?.id === product.id) {
      togglePlay();
    } else {
      playTrack(product);
    }
  };

  return (
    <div
      className="group relative bg-white border border-zinc-200/80 hover:border-amber-400/80 rounded-lg p-3 transition-all duration-300 hover:shadow-retro flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vinyl Sleeve & Slide-out Disc Container */}
      <div className="relative overflow-hidden aspect-square bg-[#1a1c22] rounded-md mb-3 flex items-center justify-center">
        
        {/* Slide-out Vinyl Disc */}
        <div
          className={`absolute transition-all duration-500 ease-out pointer-events-none ${
            isHovered || isCurrentPlaying
              ? "translate-x-12 rotate-45 opacity-95"
              : "translate-x-0 opacity-0"
          }`}
          style={{ right: "-10px", top: "10px" }}
        >
          <VinylSpin
            posterUrl={product.posterUrl}
            isPlaying={isCurrentPlaying}
            size="md"
          />
        </div>

        {/* Sleeve Album Cover */}
        <Link
          to={`/product/${encodeURIComponent(product.title)}`}
          className="relative z-10 w-full h-full block overflow-hidden rounded shadow-md"
        >
          <img
            src={product.posterUrl || "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80"}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
              <Disc className="w-8 h-8 text-zinc-600 animate-spin" />
            </div>
          )}
        </Link>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-md transition-transform active:scale-90 ${
              isFavorited
                ? "bg-red-500 text-white"
                : "bg-white/90 hover:bg-white text-zinc-700"
            }`}
            title={isFavorited ? "Bỏ yêu thích" : "Yêu thích"}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>

          {/* Audio preview button */}
          <button
            onClick={handleAudioPreview}
            className={`p-2 rounded-full shadow-md transition-transform active:scale-90 ${
              isCurrentPlaying
                ? "bg-amber-400 text-black animate-pulse"
                : "bg-white/90 hover:bg-white text-zinc-800"
            }`}
            title={isCurrentPlaying ? "Tạm dừng" : "Nghe thử demo"}
          >
            {isCurrentPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Stock / Format Badge */}
        <div className="absolute bottom-2 left-2 z-20 flex flex-wrap gap-1">
          {product.stockStatus ? (
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wider rounded ${
                product.stockStatus.toLowerCase().includes("hết")
                  ? "bg-red-600 text-white"
                  : product.stockStatus.toLowerCase().includes("pre")
                  ? "bg-indigo-600 text-white"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {product.stockStatus}
            </span>
          ) : (
            <span className="text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wider rounded bg-emerald-600 text-white">
              CÒN HÀNG
            </span>
          )}
          {product.platform && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded bg-black/70 text-white backdrop-blur-sm">
              {product.platform}
            </span>
          )}
        </div>
      </div>

      {/* Info & Metadata */}
      <div className="flex-1 flex flex-col justify-between pt-1">
        <div>
          <p className="text-xs text-zinc-500 font-semibold tracking-wide truncate">
            {product.artist || "Nghệ sĩ Vocal/Band"}
          </p>
          <Link
            to={`/product/${encodeURIComponent(product.title)}`}
            className="font-bold text-sm text-zinc-900 hover:text-amber-600 transition-colors line-clamp-1 mt-0.5"
            title={product.title}
          >
            {product.title}
          </Link>

          <div className="flex items-baseline justify-between mt-2">
            <span className="text-base font-extrabold text-[#13151A]">
              {product.price ? product.price.toLocaleString("vi-VN") : "0"} ₫
            </span>
            {product.releaseYear && (
              <span className="text-[11px] text-zinc-400 font-medium">
                {product.releaseYear}
              </span>
            )}
          </div>
        </div>

        {/* Action Button: Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-[#13151A] hover:bg-amber-400 hover:text-black text-white py-2 px-3 rounded-none font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-black shadow-retro-sm transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>THÊM VÀO GIỎ</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
