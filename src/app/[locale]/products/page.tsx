'use client';
import DesktopFilters from '@/modules/products/components/desktop-filters';
import MobileFilters from '@/modules/products/components/mobile-filters';
import ProductCardSkeleton from '@/modules/products/components/product-card-skeleton';
import ProductList from '@/modules/products/components/product-list';
import {
  useProducts,
  withProductsProvider,
} from '@/modules/products/components/products-provider';
import CustomPagination from '@ui/custom-pagination';
import { useTranslations } from 'next-intl';

const Products = () => {
  const t = useTranslations();
  const {
    queryResult: { data, isLoading },
    dispatch,
    params: { offset },
  } = useProducts();
  const products = data?.data.data || [];
  return (
    <div className="container grid grid-cols-4 gap-6 py-10 lg:py-16">
      <DesktopFilters />
      <div className="col-span-full space-y-6 md:col-span-3">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
            <h1 className="text-3xl font-bold">{t('ProductsPage.products')}</h1>
            <p className="text-muted-foreground">
              {t('ProductsPage.showing')} {products.length}{' '}
              {t('ProductsPage.of')} {data?.data.pagination.total_items || 0}{' '}
              {t('ProductsPage.products')}
            </p>
          </div>
          <MobileFilters />
        </div>

        {isLoading ? (
          <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i}>
                <ProductCardSkeleton />
              </li>
            ))}
          </ul>
        ) : (
          <ProductList products={products} />
        )}
        <CustomPagination
          className="mx-auto"
          defaultPage={Number(offset || 1)}
          key={offset}
          onValueChange={(page) => {
            dispatch({ type: 'SET_PAGE', payload: String(page) });
          }}
          totalPages={data?.data.pagination.total_pages || 1}
        />
      </div>
    </div>
  );
};

export default withProductsProvider(Products);
