export interface OrderDetail {
  orderDetailId: number;
  orderId: number;
  productName: string;
  productCode: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
  createdAt: string; // ISO date
}