'use client';
import { Button } from '@ui/button';
import { useTranslations } from 'next-intl';
import { FiltersOptions } from './filters-options';
import { useProducts } from './products-provider';

const DesktopFilters = () => {
  const t = useTranslations();
  const { dispatch } = useProducts();
  return (
    <div className="col-span-1 hidden h-fit rounded-2xl border bg-card px-6 py-4 md:block">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold lg:text-xl">
          {t('ProductsPage.filters')}
        </h3>
        <Button
          onClick={() => {
            dispatch({ type: 'RESET_FILTERS' });
          }}
          variant="outline"
          size="sm"
          className="rounded-full"
        >
          {t('ProductsPage.reset')}
        </Button>
      </div>
      <FiltersOptions
        onOptionsChange={(options) => {
          console.log(options);
        }}
        options={{
          colors: ['Red', 'Blue'],
          priceRange: [50, 100],
          sizes: ['S', 'XL'],
        }}
        className="*:not-last:border-b *:not-last:py-4 *:last:pt-4"
      />
    </div>
  );
};

export default DesktopFilters;
