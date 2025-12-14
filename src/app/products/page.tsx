'use client';
import { duplicateArray } from '@/lib/utils';
import ProductCard from '@components/product-card';
import products from '@public/data.json';
import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/collapsible';
import { Input } from '@ui/input';
import { Slider } from '@ui/slider';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Products = () => {
  const [range, setRange] = useState([1, 67]);
  return (
    <div className="container grid grid-cols-4 gap-6 py-16">
      <div className="col-span-1 h-fit rounded-2xl border px-6 py-4">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold">Filters</h3>
          <Button variant="outline" size="sm" className="rounded-full">
            Reset
          </Button>
        </div>
        <div className="*:not-last:border-b *:not-last:py-4 *:last:pt-4">
          <Collapsible className="group/collapsible">
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-lg leading-0 text-muted-foreground hover:text-foreground">
              <span>Price</span>
              <ChevronRight
                size={20}
                className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <Slider
                value={range}
                onValueChange={setRange}
                max={100}
                step={1}
              />
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-px">
                  <label
                    htmlFor="from"
                    className="text-sm text-muted-foreground"
                  >
                    From
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
                    To
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
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-lg leading-0 text-muted-foreground hover:text-foreground">
              <span>Size</span>
              <ChevronRight
                size={20}
                className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
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
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-lg leading-0 text-muted-foreground hover:text-foreground">
              <span>Availability</span>
              <ChevronRight
                size={20}
                className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-2">
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
                  In Stock
                </span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
                  Out of Stock
                </span>
              </label>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <ul className="col-span-3 grid grid-cols-3 gap-6">
        {duplicateArray(products, 2).map((product, index) => (
          <li key={index}>
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomCheckbox = ({
  children,
  onChecked,
  checked,
  defaultChecked,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onChecked?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
}) => {
  const [value, setValue] = useState(checked || defaultChecked || false);
  return (
    <Button
      variant={value ? 'default' : 'secondary'}
      size="sm"
      className="rounded-full"
      asChild
    >
      <label>
        {children}

        <input
          type="checkbox"
          hidden
          checked={value}
          onChange={() => {
            setValue(!value);
            onChecked?.(!value);
          }}
        />
      </label>
    </Button>
  );
};

export default Products;
