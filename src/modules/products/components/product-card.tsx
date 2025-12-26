'use client';
import { Product } from '@/modules/products/types';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Rating from '@components/rating';

type Props = {
  delay?: number;
} & Pick<Product, 'id' | 'name' | 'price' | 'images'>;

const ProductCard = ({ id, name, price, images, delay = 0 }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();
  const image = images?.thumbnail?.[0]?.urls?.medium;
  return (
    <article
      className="group relative"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group-hover:shadow-hover relative overflow-hidden rounded-2xl bg-secondary transition-all duration-500 ease-out">
        <Link
          href={`/products/${id}`}
          className="relative block aspect-4/5 overflow-hidden"
        >
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div
            className={cn(
              'absolute inset-0 flex items-end justify-center bg-linear-to-t from-foreground/20 to-transparent p-4 transition-all duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Button
              size="lg"
              variant="secondary"
              className="flex w-full items-center justify-center gap-2 font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <ShoppingBag />
              {t('Global.addToCart')}
            </Button>
          </div>
        </Link>
      </div>

      <div className="mt-4 space-y-2 px-1">
        <Link
          href={`/products/${id}`}
          className="font-medium text-foreground transition-colors duration-300 group-hover:text-primary"
        >
          {name}
        </Link>

        <Rating rating={4.5} />
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">
            ${price}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
