'use client';
import { useState } from 'react';
import CartList from './_components/cart-list';
import PaymentSummary from './_components/payment-summary';

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
  const isEmpty = products.length === 0;
  return (
    <div className="container space-y-4 py-6 sm:py-10">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="grid gap-4 *:rounded-xl *:border md:grid-cols-5">
        <CartList
          products={products}
          onQuantityChange={(index, quantity) => {
            setProducts((prev) => {
              const newProducts = [...prev];
              newProducts[index].quantity = quantity;
              return newProducts;
            });
          }}
        />
        <PaymentSummary
          disabled={isEmpty}
          subtotal={subtotal}
          deliveryFee={isEmpty ? 0 : 50}
          discount={isEmpty ? 0 : 0.5}
        />
      </div>
    </div>
  );
};

export default Cart;
