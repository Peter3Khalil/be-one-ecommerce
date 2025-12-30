import { Link } from '@/i18n/navigation';
import Counter from '@components/counter';
import { Button } from '@ui/button';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { CartProduct } from '../types';
import { cn, detectLang, formatPrice } from '@/lib/utils';
type Props = {
  products: Array<CartProduct>;
  // eslint-disable-next-line no-unused-vars
  onQuantityChange?: (index: number, quantity: number) => void;
  // eslint-disable-next-line no-unused-vars
  onRemoveProduct?: (index: number) => void;
  className?: string;
};
const CartList: FC<Props> = ({
  products,
  onQuantityChange,
  onRemoveProduct,
  className,
}) => {
  const t = useTranslations();
  if (products.length === 0) {
    return (
      <div
        className={cn(
          'flex h-fit flex-col items-center justify-center gap-4 bg-card px-4 py-10',
          className
        )}
      >
        <p className="text-center text-2xl font-medium">
          {t('CartPage.cartEmpty')}
        </p>
        <Button asChild>
          <Link href="/products">{t('CartPage.shopProducts')}</Link>
        </Button>
      </div>
    );
  }
  return (
    <ul
      className={cn(
        'h-fit space-y-4 bg-card p-4 *:not-last:border-b *:not-last:pb-4',
        className
      )}
    >
      {products.map(
        ({ productId, image, title, size, color, price, quantity }, index) => (
          <li key={index} className="relative flex gap-4">
            <Link href={`/products/${productId}`} className="block shrink-0">
              <img
                src={image}
                alt="Product Image"
                className="aspect-square h-32 rounded-lg object-contain"
              />
            </Link>
            <div className="flex w-full flex-col">
              <Link
                href={`/products/${productId}?color=${color}&size=${size}`}
                className="underline-offset-2 hover:underline"
              >
                <h2
                  className={cn(
                    'mb-1 w-fit max-w-[154px] text-base font-semibold md:max-w-md md:text-lg md:text-xl',
                    {
                      arabic: detectLang(title) === 'ar',
                      english: detectLang(title) === 'en',
                    }
                  )}
                >
                  {title}
                </h2>
              </Link>
              <p className="text-sm text-muted-foreground">
                <b>{t('Global.size')}:</b>{' '}
                <span
                  className={cn({
                    arabic: detectLang(size) === 'ar',
                    english: detectLang(size) === 'en',
                  })}
                >
                  {size}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                <b>{t('Global.color')}:</b>{' '}
                <span
                  className={cn({
                    arabic: detectLang(color) === 'ar',
                    english: detectLang(color) === 'en',
                  })}
                >
                  {color}
                </span>
              </p>
              <div className="mt-auto flex w-full items-center">
                <p className="text-xl font-medium md:text-3xl">
                  {formatPrice(price)}
                </p>
                <Counter
                  className="ms-auto"
                  initialValue={quantity}
                  onChange={(value) => {
                    onQuantityChange?.(index, value);
                  }}
                />
              </div>
            </div>
            <Button
              variant="destructive"
              size="icon-sm"
              className="absolute end-0"
              onClick={() => {
                onRemoveProduct?.(index);
              }}
            >
              <Trash2 />
            </Button>
          </li>
        )
      )}
    </ul>
  );
};

export default CartList;
