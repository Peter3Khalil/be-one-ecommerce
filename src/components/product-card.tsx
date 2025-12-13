import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import Rating from './rating';

type Props = {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  discount?: number;
  delay?: number;
};

const ProductCard = ({
  image,
  name,
  price,
  originalPrice,
  rating,
  discount,
  delay = 0,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <article
      className="group relative"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group-hover:shadow-hover relative overflow-hidden rounded-2xl bg-secondary transition-all duration-500 ease-out">
        {discount && (
          <Badge className="absolute top-3 left-3 z-10">-{discount}%</Badge>
        )}

        <div className="relative aspect-4/5 overflow-hidden">
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
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 px-1">
        <h3 className="font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
          {name}
        </h3>

        <Rating rating={rating} />
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
