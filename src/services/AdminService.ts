import apiClient from "./apiClient";
import { IVocCatalogImportRequest, IVocProductImportRequest } from "types";

export const importVocCatalog = async (params?: IVocCatalogImportRequest) => {
  try {
    const url = params?.limit
      ? `/api/v1/admin/catalog-imports/voc?limit=${params.limit}`
      : "/api/v1/admin/catalog-imports/voc";
    const res = await apiClient.post(url);
    return res;
  } catch (error) {
    console.error("AdminService.importVocCatalog error:", error);
    throw error;
  }
};

export const importVocProduct = async (data: IVocProductImportRequest) => {
  try {
    const res = await apiClient.post(
      "/api/v1/admin/catalog-imports/voc/product",
      data
    );
    return res;
  } catch (error) {
    console.error("AdminService.importVocProduct error:", error);
    throw error;
  }
};

export const testDiagnosticHello = async () => {
  try {
    const res = await apiClient.get("/api/v1/test/hello");
    return res;
  } catch (error) {
    console.error("AdminService.testDiagnosticHello error:", error);
    throw error;
  }
};

export const getActuatorHealth = async () => {
  try {
    const res = await apiClient.get("/actuator/health");
    return res;
  } catch (error) {
    console.error("AdminService.getActuatorHealth error:", error);
    throw error;
  }
};

export const getActuatorInfo = async () => {
  try {
    const res = await apiClient.get("/actuator");
    return res;
  } catch (error) {
    console.error("AdminService.getActuatorInfo error:", error);
    throw error;
  }
};
