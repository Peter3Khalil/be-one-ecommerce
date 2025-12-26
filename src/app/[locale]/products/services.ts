import axiosClient from '@/lib/axios-client';
import { ProductsResponse } from './types';

export function getProducts() {
  return axiosClient.get<ProductsResponse>('/products');
}
