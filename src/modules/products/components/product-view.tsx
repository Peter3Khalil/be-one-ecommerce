import Counter from '@components/counter';
import ImageGallery from '@components/image-gallery';
import Rating from '@components/rating';
import { Button, buttonVariants } from '@ui/button';
import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Skeleton } from '@ui/skeleton';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Product } from '../types';
type Props = {
  product: Product;
};
const ProductView: FC<Props> = ({
  product: { images, description, price, name, variants },
}) => {
  const t = useTranslations();
  const [currentColor, setCurrentColor] = useState(variants[0].color || '');
  const [currentSize, setCurrentSize] = useState(variants[0].size || '');
  const distinctColors = getDistinctColors({ variants });
  const [quantity, setQuantity] = useState(1);
  const sizes = distinctColors.get(currentColor)?.sizes || [];
  // const currentVariantId = variants.find(
  //   (v) => v.color === currentColor && v.size === currentSize
  // )?.id;

  return (
    <article className="container flex flex-col gap-8 py-10 *:flex-1 md:flex-row md:py-16">
      <ImageGallery
        key={currentColor}
        images={
          images?.[currentColor]?.map(({ urls: { original } }) => original) ||
          []
        }
      />
      <div className="flex flex-1 flex-col divide-y-2 divide-accent *:py-4 *:last:pb-0 dark:divide-y dark:divide-accent/50">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{name}</h1>
          <Rating rating={4.5} size={24} />
          <p className="text-xl font-semibold text-primary">{price}</p>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div>
          <span className="text-muted-foreground">
            {t('ProductDetailsPage.selectColor')}
          </span>
          <div className="mt-2 flex items-center gap-3">
            <RadioGroup
              onValueChange={(color) => {
                setCurrentColor(color);
                setCurrentSize('');
              }}
              defaultValue={currentColor}
            >
              <ul className="flex items-center gap-2">
                {Object.keys(images || {}).map((color) => (
                  <li key={color} className="flex">
                    <RadioGroupItem value={color} hidden id={color}>
                      {color}
                    </RadioGroupItem>
                    <Label
                      className={buttonVariants({
                        variant:
                          currentColor === color ? 'default' : 'secondary',
                        size: 'sm',
                        className: 'capitalize',
                      })}
                      htmlFor={color}
                    >
                      {color}
                    </Label>
                  </li>
                ))}
              </ul>
            </RadioGroup>
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">
            {t('ProductDetailsPage.chooseSize')}
          </span>
          <div className="mt-2 flex items-center gap-3">
            <RadioGroup
              onValueChange={(size) => setCurrentSize(size)}
              defaultValue={currentSize}
              key={currentColor}
            >
              <ul className="flex items-center gap-2">
                {sizes.map(({ size }) => (
                  <li key={size} className="flex">
                    <RadioGroupItem value={size} hidden id={size}>
                      {size}
                    </RadioGroupItem>
                    <Label
                      className={buttonVariants({
                        variant: size == currentSize ? 'default' : 'secondary',
                        size: 'sm',
                      })}
                      htmlFor={size}
                    >
                      {size}
                    </Label>
                  </li>
                ))}
              </ul>
            </RadioGroup>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Counter
            initialValue={quantity}
            onChange={(val) => setQuantity(val)}
          />
          <Button
            size="lg"
            className="flex-1"
            disabled={!currentSize || !currentColor}
          >
            {t('Global.addToCart')}
          </Button>
        </div>
      </div>
    </article>
  );
};

function getDistinctColors({ variants }: { variants: Product['variants'] }) {
  const colorsMap = new Map<
    string,
    {
      variantIds: Array<string>;
      sizes: Array<{
        size: string;
        stock: number;
      }>;
      totalStock: number;
    }
  >();

  variants.forEach(({ color, id, size, stock }) => {
    if (!colorsMap.has(color)) {
      colorsMap.set(color, {
        variantIds: [id],
        sizes: [{ size, stock }],
        totalStock: stock,
      });
    } else {
      colorsMap.get(color)?.variantIds.push(id);
      colorsMap.get(color)?.sizes.push({ size, stock });
      colorsMap.get(color)!.totalStock += stock;
    }
  });

  return colorsMap;
}

export function ProductViewSkeleton() {
  return (
    <article className="container flex flex-col gap-8 py-10 *:flex-1 md:flex-row md:py-16">
      <div className="flex flex-1 flex-col gap-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="mx-auto flex gap-2">
          <Skeleton className="h-20 w-20 rounded-lg" />
          <Skeleton className="h-20 w-20 rounded-lg" />
          <Skeleton className="h-20 w-20 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-1 flex-col divide-y-2 divide-accent *:py-4 *:last:pb-0 dark:divide-y dark:divide-accent/50">
        <div className="space-y-2">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-12" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </article>
  );
}

export default ProductView;
