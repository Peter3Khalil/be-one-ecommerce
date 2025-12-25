'use client';
import { capitalize, getAllGovernorates } from '@/lib/utils';
import InputFormField from '@components/input-form-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import Combobox from '@ui/combobox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { Form } from '@ui/form';
import { Label } from '@ui/label';
import { FC, useId } from 'react';
import { useForm } from 'react-hook-form';
import { getGovernorates, getSubregions } from 'subdivisions-of-egypt';
import z from 'zod';

export const addressSchema = z.object({
  customer_name: z.string().min(1, 'Full Name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  region: z.string().min(1, 'Region is required'),
  postal_code: z.string().optional().or(z.literal('')),
  country: z.string().min(1, 'Country is required'),
});
export type AddressFormData = z.infer<typeof addressSchema>;

type Props = {
  // eslint-disable-next-line no-unused-vars
  onAddressAdd?: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
  trigger?: React.ReactNode;
};
const AddressDialog: FC<Props> = ({ onAddressAdd, defaultValues, trigger }) => {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: 'Egypt',
      ...defaultValues,
    },
  });

  function onSubmit(data: AddressFormData) {
    console.log(data);
    onAddressAdd?.(data);
  }
  const formId = useId();
  const selectedGovernorateId = getGovernorates().find(
    (gov) =>
      gov.name_en === form.getValues('city') ||
      gov.name_ar === form.getValues('city')
  )?.id;
  const regionsOfCity = selectedGovernorateId
    ? getSubregions(selectedGovernorateId)
    : [];
  const regions = regionsOfCity
    .map(({ name_en }) => name_en)
    .concat(regionsOfCity.map(({ name_ar }) => name_ar));
  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" className="w-full rounded-full">
              + Add New Address
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>
              Enter your shipping address details below.
            </DialogDescription>
          </DialogHeader>
          <form
            id={formId}
            className="grid gap-6 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputFormField
              control={form.control}
              name="customer_name"
              label="Full Name"
              placeholder="John Doe"
              required
            />
            <InputFormField
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="+1 234 567 890"
              required
            />
            <InputFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="john@example.com"
              required
            />
            <InputFormField
              control={form.control}
              name="country"
              label="Country"
              placeholder="Egypt"
              disabled
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Label className="gap-1">
                  City
                  <span className="text-destructive">*</span>
                </Label>
                <Combobox
                  items={getAllGovernorates().map((val) => ({
                    value: val,
                    label: capitalize(val),
                  }))}
                  value={form.getValues('city')}
                  placeholder="Select City"
                  onValueChange={(city) => {
                    form.setValue('city', city);
                    form.trigger('city');
                    form.setValue('region', ''); // Reset region when city changes
                  }}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="gap-1">
                  Region
                  <span className="text-destructive">*</span>
                </Label>
                <Combobox
                  items={regions.map((val) => ({
                    value: val,
                    label: capitalize(val),
                  }))}
                  value={form.getValues('region')}
                  placeholder="Select Region"
                  onValueChange={(region) => {
                    form.setValue('region', region);
                    form.trigger('region');
                  }}
                  className="w-full"
                />
              </div>
            </div>
            <InputFormField
              control={form.control}
              name="address"
              label="Address"
              placeholder="123 Main Street, Apt 4"
              required
            />
            <InputFormField
              control={form.control}
              name="postal_code"
              label="Postal Code (Optional)"
              placeholder="12345"
            />
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                form={formId}
              >
                Save Address
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default AddressDialog;
