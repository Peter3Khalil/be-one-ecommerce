import Counter from '@components/counter';
import { Button } from '@ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';
type Props = {
  products: Array<{
    id: number;
    image: string;
    title: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
  }>;
  // eslint-disable-next-line no-unused-vars
  onQuantityChange?: (index: number, quantity: number) => void;
};
const CartList: FC<Props> = ({ products, onQuantityChange }) => {
  return (
    <ul className="space-y-4 bg-card *:not-last:border-b *:not-last:pb-4 md:col-span-3">
      {products.map((product, index) => (
        <li key={index} className="relative flex gap-4">
          <Link href={`/products/${product.id}`} className="block shrink-0">
            <img
              src={product.image}
              alt="Product Image"
              className="aspect-square h-32 rounded-lg"
            />
          </Link>
          <div className="flex w-full flex-col">
            <Link
              href={`/products/${product.id}`}
              className="underline-offset-2 hover:underline"
            >
              <h2 className="max-w-[154px] text-base font-semibold md:max-w-md md:text-lg md:text-xl">
                {product.title}
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              <b>Size:</b> {product.size}
            </p>
            <p className="text-sm text-muted-foreground">
              <b>Color:</b> {product.color}
            </p>
            <div className="mt-auto flex w-full items-center">
              <p className="text-xl font-medium md:text-3xl">
                ${product.price}
              </p>
              <Counter
                className="ms-auto"
                initialValue={product.quantity}
                onChange={(value) => {
                  onQuantityChange?.(index, value);
                }}
              />
            </div>
          </div>
          <Button
            variant="destructive"
            size="icon-sm"
            className="absolute right-0"
          >
            <Trash2 />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
