'use client';
import { cn } from '@/lib/utils';
import { AddressFormData } from '@/modules/cart/components/address-dialog';
import CartList from '@/modules/cart/components/cart-list';
import { useCart } from '@/modules/cart/components/cart-provider';
import OrderSuccess from '@/modules/cart/components/order-success';
import PaymentSummary from '@/modules/cart/components/payment-summary';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const CartPage = () => {
  const t = useTranslations();
  const [orderData, setOrderData] = useState<{
    orderId: number;
    address: AddressFormData;
  } | null>(null);
  const { products, subtotal, isEmpty, updateQuantity, removeProduct } =
    useCart();

  return (
    <div className="container space-y-4 py-6 sm:py-10">
      {orderData ? (
        <OrderSuccess
          orderId={orderData.orderId.toString()}
          address={orderData.address}
          className="mx-auto max-w-xl"
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold">{t('CartPage.yourCart')}</h1>
          <div
            className={cn('*:rounded-xl *:border', {
              'grid gap-4 md:grid-cols-5': !isEmpty,
            })}
          >
            <CartList
              products={products}
              onQuantityChange={updateQuantity}
              onRemoveProduct={removeProduct}
              className={cn({
                'mx-auto max-w-2xl': isEmpty,
                'md:col-span-3': !isEmpty,
              })}
            />
            {!isEmpty && (
              <PaymentSummary
                disabled={isEmpty}
                subtotal={subtotal}
                deliveryFee={isEmpty ? 0 : 5}
                onSuccess={(data) => {
                  setOrderData(data);
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
