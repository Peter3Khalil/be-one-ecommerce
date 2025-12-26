'use client';
import ProductCard from '@/modules/products/components/product-card';
import { Product } from '@/modules/products/types';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Button } from './ui/button';
import ProductCardSkeleton from '@/modules/products/components/product-card-skeleton';
type Props = {
  title: string;
  description: string;
  products: Product[];
  isLoading?: boolean;
};
const ProductsSection: FC<Props> = ({
  title,
  description,
  products,
  isLoading,
}) => {
  const t = useTranslations();
  return (
    <section className="container flex flex-col gap-16 border-b py-16">
      <div className="text-center">
        <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          {description}
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <li key={i}>
                <ProductCardSkeleton />
              </li>
            ))
          : products.map((product, index) => (
              <li key={index}>
                <ProductCard
                  key={product.id}
                  {...product}
                  delay={index * 100}
                />
              </li>
            ))}
      </ul>

      <Button
        variant="outline"
        size="lg"
        className="group mx-auto gap-2 rounded-full"
      >
        {t('Global.viewAllProducts')}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
      </Button>
    </section>
  );
};

export default ProductsSection;
