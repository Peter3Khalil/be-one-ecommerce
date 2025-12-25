'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';

type Props = React.ComponentProps<typeof Button> & {
  placeholder?: string;
  searchPlaceholder?: string;
  items: Array<{ value: string; label: string }>;
  noFoundText?: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
};
const Combobox: React.FC<Props> = ({
  className,
  placeholder = 'Select item...',
  searchPlaceholder = 'Search item...',
  items = [],
  noFoundText = 'No items found.',
  onValueChange,
  defaultValue,
  value: propValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(propValue || defaultValue || '');
  React.useEffect(() => {
    setValue(propValue || '');
  }, [propValue]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', className)}
        >
          {value ? (
            items.find((item) => item.value === value)?.label
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{noFoundText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    if (onValueChange) {
                      onValueChange(currentValue === value ? '' : currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ms-auto',
                      item.value === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
