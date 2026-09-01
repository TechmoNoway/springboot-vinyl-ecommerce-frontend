import apiClient from "./apiClient";
import { IPaymentCreateRequest } from "types";

export const createPayment = async (data: IPaymentCreateRequest) => {
  try {
    const res = await apiClient.post("/api/v1/payments/create", data);
    return res;
  } catch (error) {
    console.error("PaymentService.createPayment error:", error);
    throw error;
  }
};

export const getPaymentStatus = async (orderId: string) => {
  try {
    const res = await apiClient.get(`/api/v1/payments/${orderId}`);
    return res;
  } catch (error) {
    console.error("PaymentService.getPaymentStatus error:", error);
    throw error;
  }
};

export const triggerPaymentWebhook = async (
  provider: string,
  payload: unknown
) => {
  try {
    const res = await apiClient.post(
      `/api/v1/payments/webhook/${provider}`,
      payload
    );
    return res;
  } catch (error) {
    console.error("PaymentService.triggerPaymentWebhook error:", error);
    throw error;
  }
};
