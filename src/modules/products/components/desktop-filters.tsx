'use client';
import { Button } from '@ui/button';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { AvailableFilters } from '../types';
import { FiltersOptions } from './filters-options';
type Props = {
  filtersOptions?: AvailableFilters;
  defaultValues?: Partial<AvailableFilters> & {
    availability?: { inStock: boolean; outOfStock: boolean };
  };
  // eslint-disable-next-line no-unused-vars
  onOptionsChange?: (options: AvailableFilters) => void;
  onReset?: () => void;
};
const DesktopFilters: FC<Props> = ({
  filtersOptions,
  defaultValues,
  onOptionsChange,
  onReset,
}) => {
  const t = useTranslations();
  if (!filtersOptions) {
    return null;
  }
  return (
    <div className="col-span-1 hidden h-fit rounded-2xl border bg-card px-6 py-4 md:block">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold lg:text-xl">
          {t('ProductsPage.filters')}
        </h3>
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="rounded-full"
        >
          {t('ProductsPage.reset')}
        </Button>
      </div>
      <FiltersOptions
        defaultValues={defaultValues}
        onOptionsChange={(options) => {
          onOptionsChange?.(options);
        }}
        options={{
          ...filtersOptions,
          availability: { inStock: false, outOfStock: false },
        }}
        className="*:not-last:border-b *:not-last:py-4 *:last:pt-4"
      />
    </div>
  );
};

export default DesktopFilters;
