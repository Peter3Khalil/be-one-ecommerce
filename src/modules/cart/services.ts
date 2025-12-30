import axiosClient from '@/lib/axios-client';
import { CreateOrderResponse, ShippingData } from './types';

export function createOrder(data: {
  cartItems: Array<{
    product_variant_id: number;
    quantity: number;
  }>;
  shippingData: ShippingData;
}) {
  return axiosClient.post<CreateOrderResponse>('/orders', data);
}
