'use client';
import { cn, formatPrice } from '@/lib/utils';
import { Button } from '@ui/button';
import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { useCreateOrder } from '../mutations';
import AddressDialog, {
  AddressFormData,
  addressSchema,
} from './address-dialog';
import { useCart } from './cart-provider';

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
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (data: { orderId: number; address: AddressFormData }) => void;
};
const PaymentSummary: FC<Props> = ({
  subtotal,
  discount = 0,
  deliveryFee = 0,
  disabled,
  onSuccess,
}) => {
  const locale = useLocale();
  const total = subtotal - subtotal * discount + deliveryFee;
  const { mutate, isPending } = useCreateOrder();
  const { products } = useCart();
  const [isClicked, setIsClicked] = useState(false);
  const [address, setAddress] = useState<AddressFormData | undefined>(
    loadAddressFromStorage
  );
  const t = useTranslations();
  return (
    <div className="h-fit space-y-4 bg-card p-4 md:col-span-2">
      <h3 className="border-b pb-4 text-2xl font-semibold">
        {t('CartPage.paymentSummary')}
      </h3>
      <div className="space-y-4 border-b pb-4">
        <p className="text-sm font-medium text-muted-foreground">
          {t('CartPage.paymentMethod')}
        </p>
        <RadioGroup lang={locale} defaultValue="cash_on_delivery">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="cash_on_delivery" id="r1" />
            <Label htmlFor="r1">{t('CartPage.cashOnDelivery')}</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem disabled value="credit_card" id="r2" />
            <Label htmlFor="r2" className="opacity-40">
              {t('CartPage.creditCard')} ({t('Global.soon')})
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4 border-b pb-4">
        <p className="text-sm font-medium text-muted-foreground">
          {t('CartPage.address')}
        </p>
        {address ? (
          <div className="space-y-1">
            <p>
              <span className="text-sm text-muted-foreground">
                {t('CartPage.name')}:
              </span>{' '}
              {address.customer_name}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">
                {t('CartPage.phone')}:
              </span>{' '}
              {address.phone}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">
                {t('CartPage.email')}:
              </span>{' '}
              {address.email}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">
                {t('CartPage.location')}:
              </span>{' '}
              {address.region}, {address.city}, {address.country}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">
                {t('CartPage.address')}:
              </span>{' '}
              {address.address}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">
                {t('CartPage.postalCode')}:
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
                  {t('CartPage.editAddress')}
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
            {t('CartPage.noAddressAdded')}
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
          <span>{t('CartPage.subtotal')}</span>
          <span className="font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-muted-foreground">
            <span>
              {t('CartPage.discount')} (-{(discount * 100).toFixed(0)}%)
            </span>
            <span className="font-medium text-destructive">
              -{formatPrice(subtotal * discount)}
            </span>
          </div>
        )}
        {deliveryFee > 0 && (
          <div className="flex items-center justify-between text-muted-foreground">
            <span>{t('CartPage.deliveryFee')}</span>
            <span className="font-medium text-foreground">
              {formatPrice(deliveryFee)}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-lg font-semibold">
        <span className="font-semibold">{t('CartPage.total')}</span>
        <span>{formatPrice(total)}</span>
      </div>
      <Button
        onClick={() => {
          setIsClicked(true);
          if (address)
            mutate(
              {
                cartItems: products.map(({ variantId, quantity }) => ({
                  product_variant_id: +variantId,
                  quantity,
                })),
                shippingData: address,
              },
              {
                onSuccess(data) {
                  onSuccess?.({
                    orderId: data.data.data.order_id,
                    address,
                  });
                },
              }
            );
        }}
        disabled={(!address && isClicked) || disabled || isPending}
        className="w-full rounded-full"
        size="lg"
      >
        {isPending && <Loader2 className="animate-spin" />}
        {t('CartPage.placeOrder')}
      </Button>
    </div>
  );
};

export default PaymentSummary;
