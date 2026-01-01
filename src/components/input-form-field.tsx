import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { Input } from '@ui/input';
import { PasswordInput } from '@ui/password-input';
import { PhoneInput } from '@ui/phone-input';
import { type Control, type FieldValues, type Path } from 'react-hook-form';
type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
};

type TextInputProps<T extends FieldValues> = BaseProps<T> &
  React.ComponentProps<typeof Input> & {
    type?: Exclude<
      React.ComponentProps<typeof Input>['type'],
      'password' | 'tel'
    >;
  };

type PasswordInputProps<T extends FieldValues> = BaseProps<T> &
  React.ComponentProps<typeof PasswordInput> & {
    type: 'password';
  };

type PhoneInputProps<T extends FieldValues> = BaseProps<T> &
  React.ComponentProps<typeof PhoneInput> & {
    type: 'tel';
  };

type Props<T extends FieldValues> =
  | TextInputProps<T>
  | PasswordInputProps<T>
  | PhoneInputProps<T>;

const InputFormField = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  ...props
}: Props<T>) => {
  const Comp =
    props.type === 'password'
      ? PasswordInput
      : props.type === 'tel'
        ? PhoneInput
        : Input;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-1 flex-col gap-1 space-y-0 rtl:gap-2">
          {label && (
            <FormLabel className="gap-1">
              {label}
              {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Comp {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFormField;
