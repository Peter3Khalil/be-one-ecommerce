'use client';
import { capitalize, getAllGovernorates } from '@/lib/utils';
import Counter from '@components/counter';
import InputFormField from '@components/input-form-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import Combobox from '@ui/combobox';
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
import { Form } from '@ui/form';
import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getGovernorates, getSubregions } from 'subdivisions-of-egypt';
import { z } from 'zod';

const formSchema = z.object({
  customer_name: z.string().min(1, 'Full Name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  region: z.string().min(1, 'Region is required'),
  postal_code: z.string().optional().or(z.literal('')),
  country: z.string().min(1, 'Country is required'),
});

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: 'Egypt',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  const formId = useId();
  const selectedGovernorateId = getGovernorates().find(
    (gov) =>
      gov.name_en === form.getValues('city') ||
      gov.name_ar === form.getValues('city')
  )?.id;
  const regionsOfCity = selectedGovernorateId
    ? getSubregions(selectedGovernorateId)
    : [];
  const regions = regionsOfCity
    .map(({ name_en }) => name_en)
    .concat(regionsOfCity.map(({ name_ar }) => name_ar));
  return (
    <Form {...form}>
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
          <form
            id={formId}
            className="grid gap-6 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputFormField
              control={form.control}
              name="customer_name"
              label="Full Name"
              placeholder="John Doe"
            />
            <InputFormField
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="+1 234 567 890"
            />
            <InputFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="john@example.com"
            />
            <InputFormField
              control={form.control}
              name="country"
              label="Country"
              placeholder="Egypt"
              disabled
            />
            <div className="grid grid-cols-2 gap-4">
              <Combobox
                items={getAllGovernorates().map((val) => ({
                  value: val,
                  label: capitalize(val),
                }))}
                value={form.getValues('city')}
                placeholder="Select City"
                onValueChange={(city) => {
                  form.setValue('city', city);
                  form.trigger('city');
                  form.setValue('region', ''); // Reset region when city changes
                }}
              />
              <Combobox
                items={regions.map((val) => ({
                  value: val,
                  label: capitalize(val),
                }))}
                value={form.getValues('region')}
                placeholder="Select Region"
                onValueChange={(region) => {
                  form.setValue('region', region);
                  form.trigger('region');
                }}
              />
            </div>
            <InputFormField
              control={form.control}
              name="address"
              label="Address"
              placeholder="123 Main Street, Apt 4"
            />
            <InputFormField
              control={form.control}
              name="postal_code"
              label="Postal Code"
              placeholder="12345"
            />
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                form={formId}
              >
                Save Address
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default Cart;
