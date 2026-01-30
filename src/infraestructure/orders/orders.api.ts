import { api } from "../http/axios.config";
import { ApiResponse } from "@/src/presentation/shared/types/api-response";
import { Order } from "@/src/core/interfaces/orders/order.interface";

export const ordersAPI = {
  async getAll(): Promise<ApiResponse<Order[]>> {
    const res = await api.get<ApiResponse<Order[]>>("orders");
    return res.data;
  },
};