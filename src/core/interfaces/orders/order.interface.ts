import { OrderDetail } from "./orderDetail.interface";

export interface Order {
  orderId: number;
  orderNumber: string;
  orderDate: string; // ISO date
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  orderDetails: OrderDetail[];
}