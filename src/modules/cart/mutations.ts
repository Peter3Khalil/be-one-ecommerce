import { useMutation } from '@tanstack/react-query';
import { createOrder } from './services';
import { useCart } from './components/cart-provider';

export function useCreateOrder() {
  const { clearCart } = useCart();
  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: createOrder,
    onSuccess() {
      clearCart();
    },
  });
}
