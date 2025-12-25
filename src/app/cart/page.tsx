'use client';
import Counter from '@components/counter';
import { Button } from '@ui/button';
import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';

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
            Payment Summary
          </h3>
          <div className="space-y-4 border-b pb-4">
            <p className="text-sm font-medium text-muted-foreground">
              Payment Method
            </p>
            <RadioGroup defaultValue="cash_on_delivery">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="cash_on_delivery" id="r1" />
                <Label htmlFor="r1">Cash on Delivery</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem disabled value="credit_card" id="r2" />
                <Label htmlFor="r2" className="opacity-40">
                  Credit Card (Soon)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4 border-b pb-4">
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <AddressDialog />
          </div>
          <div className="space-y-4 *:last:border-b *:last:pb-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Discount (-20%)</span>
              <span className="font-medium text-destructive">
                -${discount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span className="font-medium text-foreground">
                ${deliveryFee.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold">
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

const AddressDialog = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'egypt',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log('Saving address:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full rounded-full">
          + Add New Address
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription>
            Enter your shipping address details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="customer_name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <input
              id="customer_name"
              name="customer_name"
              type="text"
              placeholder="John Doe"
              value={formData.customer_name}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+20 123 456 7890"
              value={formData.phone}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">
              Country <span className="text-destructive">*</span>
            </Label>
            <input
              id="country"
              name="country"
              type="text"
              placeholder="Egypt"
              value={formData.country}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">
              Address <span className="text-destructive">*</span>
            </Label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main Street, Apt 4"
              value={formData.address}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">
                City <span className="text-destructive">*</span>
              </Label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Cairo"
                value={formData.city}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="postal_code">
                Postal Code <span className="text-destructive">*</span>
              </Label>
              <input
                id="postal_code"
                name="postal_code"
                type="text"
                placeholder="12345"
                value={formData.postal_code}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save Address</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
