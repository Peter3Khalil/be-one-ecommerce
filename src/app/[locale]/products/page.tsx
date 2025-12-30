'use client';
import DesktopFilters, {
  DesktopFiltersSkeleton,
} from '@/modules/products/components/desktop-filters';
import MobileFilters from '@/modules/products/components/mobile-filters';
import ProductCardSkeleton from '@/modules/products/components/product-card-skeleton';
import ProductList from '@/modules/products/components/product-list';
import {
  useProducts,
  withProductsProvider,
} from '@/modules/products/components/products-provider';
import { useFiltersQuery } from '@/modules/products/queries';
import CustomPagination from '@ui/custom-pagination';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const Products = () => {
  const t = useTranslations();
  const {
    queryResult: { data, isLoading },
    dispatch,
    params,
  } = useProducts();
  const products = data?.data.data || [];
  const { data: filtersData, isLoading: isLoadingFilters } = useFiltersQuery();
  const filtersOptions = filtersData?.data.data;
  const [isResetting, setIsResetting] = useState(false);
  return (
    <div className="container grid grid-cols-4 gap-6 py-10 lg:py-16">
      {isLoadingFilters ? (
        <DesktopFiltersSkeleton />
      ) : (
        <DesktopFilters
          filtersOptions={filtersOptions}
          onOptionsChange={(options) => {
            dispatch({ type: 'SET_CATEGORIES', payload: options.categories });
            dispatch({ type: 'SET_COLORS', payload: options.colors });
            dispatch({ type: 'SET_SIZES', payload: options.sizes });
          }}
          defaultValues={{
            categories: params.category_name,
            colors: params.color,
            sizes: params.size,
          }}
          onReset={() => {
            dispatch({ type: 'RESET_FILTERS' });
            setIsResetting((prev) => !prev);
          }}
          key={String(isResetting)}
        />
      )}
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
          <MobileFilters
            filtersOptions={filtersOptions}
            disabled={isLoadingFilters}
            onOptionsChange={(options) => {
              dispatch({ type: 'SET_CATEGORIES', payload: options.categories });
              dispatch({ type: 'SET_COLORS', payload: options.colors });
              dispatch({ type: 'SET_SIZES', payload: options.sizes });
            }}
            defaultValues={{
              categories: params.category_name,
              colors: params.color,
              sizes: params.size,
            }}
            onReset={() => {
              dispatch({ type: 'RESET_FILTERS' });
              setIsResetting((prev) => !prev);
            }}
            key={String(isResetting)}
          />
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
          defaultPage={Number(params.offset || 0) + 1}
          key={params.offset}
          onValueChange={(page) => {
            dispatch({ type: 'SET_PAGE', payload: String(page - 1) });
          }}
          totalPages={data?.data.pagination.total_pages || 1}
        />
      </div>
    </div>
  );
};

export default withProductsProvider(Products);
