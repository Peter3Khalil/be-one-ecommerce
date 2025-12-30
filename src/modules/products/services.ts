import axiosClient from '@/lib/axios-client';
import { Product, ProductParams, ProductsResponse } from './types';

export function getProducts(params?: Partial<ProductParams>) {
  return axiosClient.get<ProductsResponse>('/products', { params });
}

export function getProductById(productId: string) {
  return axiosClient.get<{
    success: boolean;
    data: Product;
  }>(`/products/${productId}`);
}
