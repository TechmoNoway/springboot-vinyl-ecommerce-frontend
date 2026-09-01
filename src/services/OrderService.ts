import apiClient from "./apiClient";
import { IPlaceOrder } from "types";

// User / Checkout endpoints
export const placeOrder = async (orderForm: IPlaceOrder) => {
  try {
    const res = await apiClient.post("/api/v1/orders/place-order", orderForm);
    return res;
  } catch (error) {
    console.error("OrderService.placeOrder error:", error);
    throw error;
  }
};

export const getMyOrders = async () => {
  try {
    const res = await apiClient.get("/api/v1/orders/me");
    return res;
  } catch (error) {
    console.error("OrderService.getMyOrders error:", error);
    throw error;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const res = await apiClient.get(`/api/v1/orders/${id}`);
    return res;
  } catch (error) {
    console.error("OrderService.getOrderById error:", error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: number | string) => {
  try {
    const res = await apiClient.get(`/api/v1/orders/user/${userId}`);
    return res;
  } catch (error) {
    console.error("OrderService.getOrdersByUserId error:", error);
    throw error;
  }
};

// Admin endpoints
export const getAllOrders = async () => {
  try {
    const res = await apiClient.get("/api/v1/orders");
    return res;
  } catch (error) {
    console.error("OrderService.getAllOrders error:", error);
    throw error;
  }
};

export const getAllOrderItems = async () => {
  try {
    const res = await apiClient.get("/api/v1/order-items");
    return res;
  } catch (error) {
    console.error("OrderService.getAllOrderItems error:", error);
    throw error;
  }
};
