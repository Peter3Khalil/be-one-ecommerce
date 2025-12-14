import { Button } from '@ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  return (
    <div className="container space-y-4 py-6 sm:py-10">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="grid gap-4 *:rounded-xl *:border *:p-4 md:grid-cols-5">
        <ul className="space-y-4 bg-card *:not-last:border-b *:not-last:pb-4 md:col-span-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="relative flex gap-4">
              <img
                src="/products/1.jpg"
                alt="Product Image"
                className="aspect-square h-32 rounded-lg"
              />
              <div className="flex w-full flex-col">
                <h2 className="max-w-[154px] text-base font-semibold md:max-w-md md:text-lg md:text-xl">
                  Satin Drape Blouse
                </h2>
                <p className="text-sm text-muted-foreground">
                  <b>Size:</b> Large
                </p>
                <p className="text-sm text-muted-foreground">
                  <b>Color:</b> Red
                </p>
                <div className="mt-auto flex w-full items-center">
                  <p className="text-xl font-medium md:text-3xl">$49</p>
                  <div className="ms-auto flex h-10 items-center gap-4 rounded-full bg-secondary *:rounded-full">
                    <Button size="icon" variant="secondary">
                      <Plus />
                    </Button>
                    <b>1</b>
                    <Button size="icon" variant="secondary">
                      <Minus />
                    </Button>
                  </div>
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
              <span className="font-medium text-foreground">$200</span>
            </div>
            <div className="flex items-center justify-between text-lg text-muted-foreground">
              <span>Discount (-20%)</span>
              <span className="font-medium text-destructive">-$40</span>
            </div>
            <div className="flex items-center justify-between text-lg text-muted-foreground">
              <span>Delivery Fee</span>
              <span className="font-medium text-foreground">$10.00</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-lg text-xl font-semibold">
            <span className="font-semibold">Total</span>
            <span>$170.00</span>
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
