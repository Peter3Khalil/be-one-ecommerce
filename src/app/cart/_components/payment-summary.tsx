'use client';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { FC, useState } from 'react';
import AddressDialog, {
  AddressFormData,
  addressSchema,
} from './address-dialog';

const STORAGE_KEY = 'address';

function loadAddressFromStorage(): AddressFormData | undefined {
  if (typeof window === 'undefined') return undefined;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    const result = addressSchema.safeParse(parsed);
    if (result.success) return result.data;
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return undefined;
}

function saveAddressToStorage(addr: AddressFormData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addr));
}

type Props = {
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
};
const PaymentSummary: FC<Props> = ({
  subtotal,
  discount = 0,
  deliveryFee = 0,
}) => {
  const total = subtotal - subtotal * discount + deliveryFee;
  const [isClicked, setIsClicked] = useState(false);
  const [address, setAddress] = useState<AddressFormData | undefined>(
    loadAddressFromStorage
  );
  return (
    <div className="h-fit space-y-4 bg-card md:col-span-2">
      <h3 className="border-b pb-4 text-2xl font-semibold">Payment Summary</h3>
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
        {address ? (
          <div className="space-y-1">
            <p>
              <span className="text-sm text-muted-foreground">Name:</span>{' '}
              {address.customer_name}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">Phone:</span>{' '}
              {address.phone}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">Email:</span>{' '}
              {address.email}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">Location:</span>{' '}
              {address.region}, {address.city}, {address.country}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">Address:</span>{' '}
              {address.address}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">
                Postal Code:
              </span>{' '}
              {address.postal_code}
            </p>
            <AddressDialog
              onAddressAdd={(data) => {
                setAddress(data);
                saveAddressToStorage(data);
              }}
              key={JSON.stringify(address)}
              defaultValues={address}
              trigger={
                <Button variant="link" className="p-0">
                  Edit Address
                </Button>
              }
            />
          </div>
        ) : (
          <p
            className={cn('text-center text-xl text-muted-foreground', {
              'animate-bounce text-destructive': isClicked && !address,
            })}
          >
            No address added yet.
          </p>
        )}
        <AddressDialog
          onAddressAdd={(data) => {
            setAddress(data);
            saveAddressToStorage(data);
          }}
          key={JSON.stringify(address)}
        />
      </div>
      <div className="space-y-4 *:last:border-b *:last:pb-4">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Discount (-{(discount * 100).toFixed(0)}%)</span>
            <span className="font-medium text-destructive">
              -${(subtotal * discount).toFixed(2)}
            </span>
          </div>
        )}
        {deliveryFee > 0 && (
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Delivery Fee</span>
            <span className="font-medium text-foreground">
              ${deliveryFee.toFixed(2)}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-lg font-semibold">
        <span className="font-semibold">Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button
        onClick={() => setIsClicked(true)}
        disabled={!address && isClicked}
        className="w-full rounded-full"
        size="lg"
      >
        Place Order
      </Button>
    </div>
  );
};

export default PaymentSummary;
