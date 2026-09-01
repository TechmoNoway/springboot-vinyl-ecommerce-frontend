import apiClient from "./apiClient";

export const getAllCategories = async () => {
  try {
    const res = await apiClient.get("/api/v1/categories");
    return res;
  } catch (error) {
    console.error("CategoryService.getAllCategories error:", error);
    throw error;
  }
};
