import React from "react";
import { IProduct } from "types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: IProduct[];
  type?: "Horizontal" | "Vertical";
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center bg-white border border-dashed border-zinc-300 rounded-lg p-8">
        <p className="text-zinc-500 font-medium text-sm">
          Không có sản phẩm nào phù hợp với điều kiện tìm kiếm.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
