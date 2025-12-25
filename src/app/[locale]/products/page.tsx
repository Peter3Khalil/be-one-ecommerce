'use client';
import { duplicateArray } from '@/lib/utils';
import ProductCard from '@components/product-card';
import { products } from '@public/data.json';
import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/collapsible';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@ui/drawer';
import { Input } from '@ui/input';
import { Slider } from '@ui/slider';
import { ChevronRight, Filter } from 'lucide-react';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ui/pagination';

const Products = () => {
  return (
    <div className="container grid grid-cols-4 gap-6 py-10 lg:py-16">
      <DesktopFilters />
      <div className="col-span-full space-y-6 md:col-span-3">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              Showing 1-10 of 100 Products
            </p>
          </div>
          <MobileFilters />
        </div>
        <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {duplicateArray(products, 2).map((product, index) => (
            <li key={index}>
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
        <Pagination>
          <PaginationContent className="flex-wrap gap-4">
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#">{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </div>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
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

const DesktopFilters = () => {
  const [range, setRange] = useState([1, 67]);
  return (
    <div className="col-span-1 hidden h-fit rounded-2xl border bg-card px-6 py-4 md:block">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold lg:text-xl">Filters</h3>
        <Button variant="outline" size="sm" className="rounded-full">
          Reset
        </Button>
      </div>
      <div className="*:not-last:border-b *:not-last:py-4 *:last:pt-4">
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
            <span>Price</span>
            <ChevronRight
              size={20}
              className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <Slider value={range} onValueChange={setRange} max={100} step={1} />
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-px">
                <label htmlFor="from" className="text-sm text-muted-foreground">
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
          <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
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
          <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
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
  );
};

const MobileFilters = () => {
  const [range, setRange] = useState([1, 67]);
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
            <h3 className="text-lg font-semibold lg:text-xl">Filters</h3>
            <Button variant="outline" size="sm" className="rounded-full">
              Reset
            </Button>
          </div>
        </DrawerHeader>
        <div className="px-4 *:py-4 *:not-last:border-b *:last:pt-4">
          <Collapsible className="group/collapsible">
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
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
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
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
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
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

        <DrawerFooter>
          <Button>Apply Filters</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Products;
