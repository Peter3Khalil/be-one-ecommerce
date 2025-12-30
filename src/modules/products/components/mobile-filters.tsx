'use client';
import { Button } from '@ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@ui/drawer';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FiltersOptions } from './filters-options';
import { AvailableFilters } from '../types';
import { FC } from 'react';

type Props = {
  filtersOptions?: AvailableFilters;
  defaultValues?: Partial<AvailableFilters> & {
    availability?: { inStock: boolean; outOfStock: boolean };
  };
  // eslint-disable-next-line no-unused-vars
  onOptionsChange?: (options: AvailableFilters) => void;
  onReset?: () => void;
};
const MobileFilters: FC<Props> = ({
  defaultValues,
  filtersOptions,
  onOptionsChange,
  onReset,
}) => {
  const t = useTranslations();
  if (!filtersOptions) {
    return null;
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-full md:hidden"
          size="icon"
        >
          <Filter />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pb-0">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-semibold lg:text-xl">
              {t('ProductsPage.filters')}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={onReset}
            >
              {t('ProductsPage.reset')}
            </Button>
          </div>
        </DrawerHeader>
        <FiltersOptions
          onOptionsChange={(options) => {
            onOptionsChange?.(options);
          }}
          options={{
            ...filtersOptions,
            availability: { inStock: false, outOfStock: false },
          }}
          className="px-4 *:py-4 *:not-last:border-b *:last:pt-4"
          defaultValues={defaultValues}
        />
        <DrawerFooter>
          <Button>{t('ProductsPage.applyFilters')}</Button>
          <DrawerClose asChild>
            <Button variant="outline">{t('Global.cancel')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilters;
