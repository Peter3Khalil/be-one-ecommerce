import { useQuery } from '@tanstack/react-query';
import { getProductById, getProducts } from './services';
import { ProductParams } from './types';

export function useProductsQuery(params?: Partial<ProductParams>) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
}

export function useProductByIdQuery(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });
}
