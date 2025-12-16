'use client';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { Minus, Plus } from 'lucide-react';
import { FC, useState } from 'react';
type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: number) => void;
  initialValue?: number;
  className?: string;
};
const Counter: FC<Props> = ({
  onChange,
  initialValue = 1,
  className,
  ...props
}) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => {
    setCount((prev) => {
      const newValue = prev + 1;
      onChange?.(newValue);
      return newValue;
    });
  };

  const decrement = () => {
    setCount((prev) => {
      const newValue = Math.max(1, prev - 1);
      onChange?.(newValue);
      return newValue;
    });
  };
  return (
    <div
      className={cn(
        'flex h-10 items-center gap-4 rounded-full bg-secondary *:rounded-full',
        className
      )}
      {...props}
    >
      <Button size="icon" variant="secondary" onClick={decrement}>
        <Minus />
      </Button>
      <b>{count}</b>
      <Button size="icon" variant="secondary" onClick={increment}>
        <Plus />
      </Button>
    </div>
  );
};

export default Counter;
