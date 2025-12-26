import React, { FC } from 'react';
import ProductCard from './product-card';
import { Product } from '../types';
import { cn } from '@/lib/utils';
import { PackageOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  products: Array<Product>;
} & React.HTMLAttributes<HTMLUListElement>;
const ProductList: FC<Props> = ({ products, className, ...props }) => {
  const t = useTranslations();
  if (products.length === 0)
    return (
      <div className="col-span-full flex w-full flex-col items-center justify-center rounded-lg border border-dashed bg-card bg-secondary/20 p-8 px-4 py-6">
        <PackageOpen className="h-16 w-16 text-muted-foreground/40" />
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            {t('ProductsPage.noProductsFound')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('ProductsPage.noProductsFoundDescription')}
          </p>
        </div>
      </div>
    );
  return (
    <ul
      className={cn(
        'grid w-full grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3',
        className
      )}
      {...props}
    >
      {products.map((product, index) => (
        <li key={index}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
