'use client';
import CartList from '@/modules/cart/components/cart-list';
import { useCart } from '@/modules/cart/components/cart-provider';
import PaymentSummary from '@/modules/cart/components/payment-summary';
import { useTranslations } from 'next-intl';

const CartPage = () => {
  const t = useTranslations();
  const { products, subtotal, isEmpty, updateQuantity, removeProduct } =
    useCart();

  return (
    <div className="container space-y-4 py-6 sm:py-10">
      <h1 className="text-3xl font-bold">{t('CartPage.yourCart')}</h1>
      <div className="grid gap-4 *:rounded-xl *:border md:grid-cols-5">
        <CartList
          products={products}
          onQuantityChange={updateQuantity}
          onRemoveProduct={removeProduct}
        />
        <PaymentSummary
          disabled={isEmpty}
          subtotal={subtotal}
          deliveryFee={isEmpty ? 0 : 5}
        />
      </div>
    </div>
  );
};

export default CartPage;
