import { useMutation } from '@tanstack/react-query';
import { useCart } from './components/cart-provider';
import { createOrder } from './services';

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
