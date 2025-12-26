import axiosClient from '@/lib/axios-client';
import { ProductParams, ProductsResponse } from './types';

export function getProducts(params?: Partial<ProductParams>) {
  return axiosClient.get<ProductsResponse>('/products', { params });
}
