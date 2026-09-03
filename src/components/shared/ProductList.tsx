import React from "react";
import { IProduct } from "types";
import ProductCard from "./ProductCard";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations/MotionWrapper";

interface ProductListProps {
  products: IProduct[];
  type?: "Horizontal" | "Vertical";
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <FadeIn direction="up" className="py-16 text-center bg-white border border-dashed border-zinc-300 rounded-lg p-8">
        <p className="text-zinc-500 font-medium text-sm">
          Không có sản phẩm nào phù hợp với điều kiện tìm kiếm.
        </p>
      </FadeIn>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

export default ProductList;
