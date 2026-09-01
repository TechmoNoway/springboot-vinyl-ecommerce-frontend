import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AccountWishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleMoveToCart = (product: typeof wishlist[0]) => {
    addToCart(product, 1);
    toast({
      title: "Đã thêm vào giỏ hàng!",
      description: `${product.title} đã sẵn sàng trong giỏ hàng.`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-current" />
          <h2 className="text-xl font-bold font-display uppercase tracking-tight text-zinc-900">
            Danh Sách Yêu Thích (Wishlist)
          </h2>
        </div>
        <span className="text-xs font-semibold text-zinc-500">
          {wishlist.length} đĩa than đã lưu
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-zinc-300 rounded-lg p-8 space-y-3">
          <Heart className="w-12 h-12 text-zinc-300 mx-auto" />
          <h3 className="text-base font-bold text-zinc-800">
            Danh sách yêu thích trống
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Nhấn vào biểu tượng trái tim trên bất kỳ đĩa than nào để lưu lại nghe thử hoặc mua sau nhé!
          </p>
          <Link
            to="/product-category/vinyl"
            className="inline-block mt-2 bg-[#13151A] hover:bg-black text-amber-300 px-6 py-2.5 text-xs font-bold uppercase shadow-retro-sm"
          >
            Dạo Tiệm Đĩa Than
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-zinc-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="relative aspect-square rounded overflow-hidden bg-zinc-100 mb-2">
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-zinc-600 hover:text-red-500 p-1.5 rounded-full shadow-sm"
                  title="Xóa khỏi wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="text-xs text-zinc-500 font-semibold truncate">
                  {item.artist || "Đĩa than"}
                </p>
                <Link
                  to={`/product/${encodeURIComponent(item.title)}`}
                  className="font-bold text-sm text-zinc-900 hover:underline line-clamp-1"
                >
                  {item.title}
                </Link>
                <p className="text-sm font-extrabold text-amber-700 mt-1">
                  {item.price?.toLocaleString()} ₫
                </p>
              </div>

              <button
                onClick={() => handleMoveToCart(item)}
                className="mt-3 w-full bg-[#13151A] hover:bg-black text-amber-300 py-2 px-3 rounded-none font-bold text-xs uppercase flex items-center justify-center gap-1.5 shadow-retro-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Thêm Vào Giỏ</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountWishlist;
