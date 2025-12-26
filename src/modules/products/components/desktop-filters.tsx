'use client';
import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/collapsible';
import CustomCheckbox from '@ui/custom-checkbox';
import { Input } from '@ui/input';
import { Slider } from '@ui/slider';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const DesktopFilters = () => {
  const t = useTranslations();
  const [range, setRange] = useState([1, 67]);
  return (
    <div className="col-span-1 hidden h-fit rounded-2xl border bg-card px-6 py-4 md:block">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold lg:text-xl">
          {t('ProductsPage.filters')}
        </h3>
        <Button variant="outline" size="sm" className="rounded-full">
          {t('ProductsPage.reset')}
        </Button>
      </div>
      <div className="*:not-last:border-b *:not-last:py-4 *:last:pt-4">
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
            <span>{t('Global.price')}</span>
            <ChevronRight
              size={20}
              className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <Slider value={range} onValueChange={setRange} max={100} step={1} />
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-px">
                <label htmlFor="from" className="text-sm text-muted-foreground">
                  {t('ProductsPage.from')}
                </label>
                <Input
                  id="from"
                  type="number"
                  value={range[0]}
                  onChange={(e) => {
                    const newValue = Math.min(Number(e.target.value), 100);
                    setRange([newValue, range[1]]);
                  }}
                />
              </div>
              <div className="flex flex-col gap-px">
                <label htmlFor="to" className="text-sm text-muted-foreground">
                  {t('ProductsPage.to')}
                </label>
                <Input
                  id="to"
                  type="number"
                  value={range[1]}
                  onChange={(e) => {
                    const newValue = Math.max(Number(e.target.value), 1);
                    setRange([range[0], newValue]);
                  }}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible className="group/collapsible">
          <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
            <span>{t('Global.size')}</span>
            <ChevronRight
              size={20}
              className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <ul className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <li key={size}>
                  <CustomCheckbox key={size}>{size}</CustomCheckbox>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible className="group/collapsible">
          <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
            <span>{t('ProductsPage.availability')}</span>
            <ChevronRight
              size={20}
              className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-2">
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
                {t('ProductsPage.inStock')}
              </span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
                {t('ProductsPage.outOfStock')}
              </span>
            </label>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default DesktopFilters;
