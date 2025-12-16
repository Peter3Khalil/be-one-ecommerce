'use client';
import Counter from '@components/counter';
import { Button } from '@ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: '/products/1.jpg',
      title: 'Satin Drape Blouse',
      size: 'Large',
      color: 'Red',
      price: 50,
      quantity: 5,
    },
    {
      id: 1,
      image: '/products/1.jpg',
      title: 'Satin Drape Blouse',
      size: 'Large',
      color: 'Red',
      price: 50,
      quantity: 1,
    },
    {
      id: 1,
      image: '/products/1.jpg',
      title: 'Satin Drape Blouse',
      size: 'Large',
      color: 'Red',
      price: 50,
      quantity: 1,
    },
  ]);
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 10;
  const total = subtotal - discount + deliveryFee;
  console.log(products);
  return (
    <div className="container space-y-4 py-6 sm:py-10">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="grid gap-4 *:rounded-xl *:border *:p-4 md:grid-cols-5">
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
                      setProducts((prev) => {
                        const newProducts = [...prev];
                        newProducts[index].quantity = value;
                        return newProducts;
                      });
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
        <div className="h-fit space-y-4 bg-card md:col-span-2">
          <h3 className="border-b pb-4 text-2xl font-semibold">
            Order Summary
          </h3>
          <div className="space-y-4 *:last:border-b *:last:pb-4">
            <div className="flex items-center justify-between text-lg text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg text-muted-foreground">
              <span>Discount (-20%)</span>
              <span className="font-medium text-destructive">
                -${discount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg text-muted-foreground">
              <span>Delivery Fee</span>
              <span className="font-medium text-foreground">
                ${deliveryFee.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-lg text-xl font-semibold">
            <span className="font-semibold">Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="w-full rounded-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
