import apiClient from "./apiClient";

export interface ProductFilterParams {
  title?: string | null;
  category?: string | null;
  platform?: string | null;
  stockStatus?: string | null;
  studioName?: string | null;
  manufactureYear?: string | number | null;
  status?: string | null;
  sortType?: string | "DEFAULT" | "ASC" | "DESC";
  page?: number;
  size?: number;
}

export const getReadyProducts = async () => {
  try {
    const res = await apiClient.get("/api/v1/products");
    return res;
  } catch (error) {
    console.error("ProductService.getReadyProducts error:", error);
    throw error;
  }
};

export const getProductByTitle = async (title: string) => {
  try {
    const res = await apiClient.get(
      `/api/v1/products?title=${encodeURIComponent(title)}`
    );
    return res;
  } catch (error) {
    console.error("ProductService.getProductByTitle error:", error);
    throw error;
  }
};

export const searchProductsByTitle = async (title: string) => {
  try {
    const res = await apiClient.get(
      `/api/v1/products?title=${encodeURIComponent(title)}`
    );
    return res;
  } catch (error) {
    console.error("ProductService.searchProductsByTitle error:", error);
    throw error;
  }
};

export const getAllProductsFilteredAndSorted = async (
  title?: string | null,
  category?: string | null,
  platform?: string | null,
  stockStatus?: string | null,
  studioName?: string | null,
  manufactureYear?: string | number | null,
  status?: string | null,
  sortType: string | "DEFAULT" = "DEFAULT"
) => {
  try {
    const params = new URLSearchParams();
    if (title && title.trim()) params.append("title", title.trim());
    if (category && category !== "ALL" && category.trim()) params.append("category", category.trim());
    if (platform && platform.trim()) params.append("platform", platform.trim());
    if (stockStatus && stockStatus.trim()) params.append("stockStatus", stockStatus.trim());
    if (studioName && studioName.trim()) params.append("studioName", studioName.trim());
    if (manufactureYear) params.append("manufactureYear", manufactureYear.toString());
    if (status && status.trim()) params.append("status", status.trim());
    if (sortType && sortType !== "DEFAULT") params.append("sortType", sortType);

    const queryString = params.toString();
    const url = queryString ? `/api/v1/products?${queryString}` : "/api/v1/products";
    const res = await apiClient.get(url);
    return res;
  } catch (error) {
    console.error("ProductService.getAllProductsFilteredAndSorted error:", error);
    throw error;
  }
};
