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
import { useCart } from '@/modules/cart/components/cart-provider';
import { cn, detectLang, formatPrice } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ShoppingCart, Share2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
type Props = {
  product: Product;
  defaultColor?: string | null;
  defaultSize?: string | null;
};
const ProductView: FC<Props> = ({
  product: { images, description, price, name, variants, id },
  defaultColor,
  defaultSize,
}) => {
  const t = useTranslations();
  const [currentColor, setCurrentColor] = useState(
    defaultColor || variants[0].color || ''
  );
  const [currentSize, setCurrentSize] = useState(
    defaultSize || variants[0].size || ''
  );
  const distinctColors = getDistinctColors({ variants });
  const [quantity, setQuantity] = useState(1);
  const {
    addProduct,
    checkVariantInCart,
    updateQuantity,
    getVariantIndex,
    getVariantQuantity,
  } = useCart();
  const sizes = distinctColors.get(currentColor)?.sizes || [];
  const currentVariantId =
    variants.find((v) => v.color === currentColor && v.size === currentSize)
      ?.id || '';
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
          <div className="flex items-start justify-between gap-2">
            <h1
              className={cn('text-3xl font-bold', {
                arabic: detectLang(name) === 'ar',
                english: detectLang(name) === 'en',
              })}
            >
              {name}
            </h1>
            <ShareProduct name={name} color={currentColor} size={currentSize} />
          </div>
          <Rating rating={4.5} size={24} />
          <p className="text-xl font-semibold text-primary">
            {formatPrice(+price)}
          </p>
          <p
            className={cn('text-muted-foreground', {
              arabic: detectLang(description) === 'ar',
              english: detectLang(description) === 'en',
            })}
          >
            {description}
          </p>
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
                        className: cn('capitalize', {
                          arabic: detectLang(color) === 'ar',
                          english: detectLang(color) === 'en',
                        }),
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
                        className: cn({
                          arabic: detectLang(size) === 'ar',
                          english: detectLang(size) === 'en',
                        }),
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
          {checkVariantInCart(currentVariantId) ? (
            <Counter
              key={currentVariantId}
              initialValue={getVariantQuantity(currentVariantId)}
              onChange={(val) => {
                const index = getVariantIndex(currentVariantId);
                if (index !== null) {
                  updateQuantity(index, val);
                }
              }}
            />
          ) : (
            <Counter
              initialValue={quantity}
              onChange={(val) => {
                setQuantity(val);
              }}
            />
          )}
          {checkVariantInCart(currentVariantId) ? (
            <Button size="lg" className="flex-1" variant="outline" asChild>
              <Link href="/cart" className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                {t('ProductDetailsPage.viewCart')}
              </Link>
            </Button>
          ) : (
            <Button
              size="lg"
              className="flex-1"
              disabled={!currentSize || !currentColor}
              onClick={() => {
                if (currentVariantId) {
                  addProduct({
                    variantId: currentVariantId,
                    quantity,
                    color: currentColor,
                    size: currentSize,
                    image: images[currentColor][0].urls.thumbnail,
                    title: name,
                    price: +price,
                    productId: id,
                  });
                }
              }}
            >
              {t('Global.addToCart')}
            </Button>
          )}
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

function ShareProduct({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: string;
}) {
  const t = useTranslations();

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (color) url.searchParams.set('color', color);
      if (size) url.searchParams.set('size', size);
      return url.toString();
    }
    return '';
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      getUrl: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      getUrl: (url: string, text: string) =>
        `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      color: 'hover:bg-[#25D366] hover:text-white',
    },
    {
      name: 'X',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      getUrl: (url: string, text: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color:
        'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      getUrl: (url: string) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#0A66C2] hover:text-white',
    },
    {
      name: 'Telegram',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      getUrl: (url: string, text: string) =>
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color: 'hover:bg-[#0088cc] hover:text-white',
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">{t('ProductDetailsPage.share')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="end">
        <div className="flex flex-col gap-1">
          <p className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
            {t('ProductDetailsPage.shareVia')}
          </p>
          <div className="flex gap-1">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.getUrl(getShareUrl(), name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${link.color} bg-muted`}
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="mt-1 justify-start"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            {t('ProductDetailsPage.copyLink')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
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
