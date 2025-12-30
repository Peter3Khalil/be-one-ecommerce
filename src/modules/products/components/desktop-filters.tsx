'use client';
import { Button } from '@ui/button';
import { Skeleton } from '@ui/skeleton';
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

export const DesktopFiltersSkeleton: FC = () => {
  return (
    <div className="col-span-1 hidden h-fit rounded-2xl border bg-card px-6 py-4 md:block">
      <div className="flex items-center justify-between border-b pb-4">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-9 w-16 rounded-full" />
      </div>
      <div className="space-y-4 pt-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="space-y-3 border-b pb-4 last:border-b-0">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopFilters;
