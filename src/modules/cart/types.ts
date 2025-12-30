import z from 'zod';
import { addressSchema } from './components/address-dialog';

export type CartProduct = {
  productId: string;
  variantId: string;
  image: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
};

export type ShippingData = z.infer<typeof addressSchema>;

export type CreateOrderResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number | null;
    total_amount: number;
    shipping_id: number;
    status: 'pending' | 'delivered' | 'cancelled' | 'refunded';
    order_id: number;
    created_at: string;
    updated_at: string;
  };
};
