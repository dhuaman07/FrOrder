import { ApiResponse } from "@/src/presentation/shared/types/api-response";
import { Order } from "@/src/core/interfaces/orders/order.interface";
import { ordersAPI } from "@/src/infraestructure/orders/orders.api";

export async function getAllOrdersUseCase(): Promise<ApiResponse<Order[]>> {
  return await ordersAPI.getAll();
}