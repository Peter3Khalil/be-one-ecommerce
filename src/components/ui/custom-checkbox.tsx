'use client';
import { useEffect, useState } from 'react';
import { Button } from './button';
import type { FC } from 'react';

type Props = React.ComponentProps<typeof Button> & {
  // eslint-disable-next-line no-unused-vars
  onChecked?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
};
const CustomCheckbox: FC<Props> = ({
  children,
  onChecked,
  checked,
  defaultChecked,
  ...props
}) => {
  const [value, setValue] = useState(checked || defaultChecked || false);
  const toggleCheckbox = () => {
    setValue(!value);
    onChecked?.(!value);
  };
  useEffect(() => {
    if (typeof checked === 'boolean') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(checked);
    }
  }, [checked]);
  return (
    <Button
      variant={value ? 'default' : 'secondary'}
      size="sm"
      onClick={toggleCheckbox}
      type="button"
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomCheckbox;
