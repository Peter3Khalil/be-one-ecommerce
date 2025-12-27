import { useQuery } from '@tanstack/react-query';
import { getProducts } from './services';
import { ProductParams } from './types';

export function useProductsQuery(params?: Partial<ProductParams>) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
}
