'use client';

import { cn } from '@/lib/utils';
import Rating from '@components/rating';
import SimilarProducts from '@components/similar-products';
import { Button } from '@ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const ProductDetails = () => {
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
            <h1 className="text-3xl font-bold">Product Title</h1>
            <Rating rating={4.5} size={24} />
            <p className="text-xl font-semibold text-primary">$99.99</p>
            <p className="text-muted-foreground">
              This is a detailed description of the product. It highlights the
              key features, specifications, and benefits of the product to
              entice potential buyers.
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Select Color</span>
            <div className="mt-2 flex items-center gap-3">
              {['red', 'blue', 'green'].map((color) => (
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
            <span className="text-muted-foreground">Choose Size</span>
            <div className="mt-2 flex items-center gap-3">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <Button key={size} variant="secondary">
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-auto flex items-center gap-4">
            <div className="flex h-10 items-center gap-4 rounded-full bg-secondary *:rounded-full">
              <Button size="icon" variant="secondary">
                <Plus />
              </Button>
              <b>1</b>
              <Button size="icon" variant="secondary">
                <Minus />
              </Button>
            </div>
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
          </div>
        </div>
      </article>
      <SimilarProducts />
    </div>
  );
};

export default ProductDetails;
