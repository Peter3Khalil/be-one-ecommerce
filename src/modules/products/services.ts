import axiosClient from '@/lib/axios-client';
import {
  FiltersResponse,
  Product,
  ProductParams,
  ProductsResponse,
} from './types';
import { createQueryString } from '@/lib/utils';

export function getProducts(params?: Partial<ProductParams>) {
  return axiosClient.get<ProductsResponse>(
    `/products?${createQueryString(params || {})}`
  );
}

export function getProductById(productId: string) {
  return axiosClient.get<{
    success: boolean;
    data: Product;
  }>(`/products/${productId}`);
}

export function getAvailableFilters() {
  return axiosClient.get<FiltersResponse>('/products/filters');
}
