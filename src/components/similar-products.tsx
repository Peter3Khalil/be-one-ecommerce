'use client';
import { ArrowRight } from 'lucide-react';
import ProductCard from './product-card';
import { Button } from './ui/button';
import { products } from '@public/data.json';
import { useTranslations } from 'next-intl';

const SimilarProducts = () => {
  const t = useTranslations();
  return (
    <section className="container flex flex-col gap-16 border-t border-b py-16">
      <div className="text-center">
        <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {t('Global.youMightAlsoLike')}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          {t('Global.youMightAlsoLikeDescription')}
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
        {products.map((product, index) => (
          <li key={index}>
            <ProductCard key={product.id} {...product} delay={index * 100} />
          </li>
        ))}
      </ul>

      <Button
        variant="outline"
        size="lg"
        className="group mx-auto gap-2 rounded-full"
      >
        {t('Global.viewAllProducts')}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </section>
  );
};

export default SimilarProducts;
