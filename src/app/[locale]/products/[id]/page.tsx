'use client';

import { cn } from '@/lib/utils';
import Counter from '@components/counter';
import Rating from '@components/rating';
import Reviews from '@components/reviews';
import SimilarProducts from '@components/similar-products';
import { Button } from '@ui/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const ProductDetails = () => {
  const t = useTranslations();
  const PRODUCT_DETAILS = {
    title: 'Product Title',
    rating: 4.5,
    price: '$99.99',
    colors: ['Red', 'Blue', 'Green'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'This is a detailed description of the product. It highlights the key features, specifications, and benefits of the product to entice potential buyers.',
  };
  const [currentImage, setCurrentImage] = useState('/products/1.jpg');
  return (
    <div>
      <article className="container flex flex-col gap-8 py-10 md:flex-row md:py-16 md:*:h-[500px]">
        <div className="flex flex-col-reverse gap-3 md:flex-row">
          <ul className="flex gap-3 md:grid md:grid-rows-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <li
                key={index}
                className="relative aspect-square md:aspect-auto md:w-32"
              >
                <img
                  src={`/products/${index + 1}.jpg`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImage(`/products/${index + 1}.jpg`)}
                  className={cn(
                    'h-full w-full rounded-xl object-cover outline-offset-3',
                    {
                      'outline-2 outline-primary/80':
                        currentImage === `/products/${index + 1}.jpg`,
                    }
                  )}
                />
              </li>
            ))}
          </ul>
          <div className="relative aspect-square w-full md:h-full md:flex-1">
            <img
              src={currentImage}
              alt="Main Product"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col divide-y-2 divide-accent *:py-4 *:last:pb-0 dark:divide-y dark:divide-accent/50">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{PRODUCT_DETAILS.title}</h1>
            <Rating rating={PRODUCT_DETAILS.rating} size={24} />
            <p className="text-xl font-semibold text-primary">
              {PRODUCT_DETAILS.price}
            </p>
            <p className="text-muted-foreground">
              {PRODUCT_DETAILS.description}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {t('ProductDetailsPage.selectColor')}
            </span>
            <div className="mt-2 flex items-center gap-3">
              {PRODUCT_DETAILS.colors.map((color) => (
                <button
                  key={color}
                  className={cn(
                    'h-8 w-8 rounded-full border-2 transition-all duration-300',
                    {
                      'border-primary': color === 'red',
                      'border-blue-500': color === 'blue',
                      'border-green-500': color === 'green',
                    }
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">
              {t('ProductDetailsPage.chooseSize')}
            </span>
            <div className="mt-2 flex items-center gap-3">
              {PRODUCT_DETAILS.sizes.map((size) => (
                <Button key={size} variant="secondary">
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-auto flex items-center gap-4">
            <Counter />
            <Button size="lg" className="flex-1">
              {t('Global.addToCart')}
            </Button>
          </div>
        </div>
      </article>
      <Reviews />
      <SimilarProducts />
    </div>
  );
};

export default ProductDetails;
