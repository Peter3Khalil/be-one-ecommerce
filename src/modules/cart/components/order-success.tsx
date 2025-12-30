'use client';

import { FC } from 'react';
import { CheckCircle2, ShoppingBag, FileText } from 'lucide-react';
import { Button } from '@ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { AddressFormData } from './address-dialog';
import { cn } from '@/lib/utils';

type Props = {
  orderId?: string;
  address: AddressFormData;
  onContinueShopping?: () => void;
  className?: string;
};

const OrderSuccess: FC<Props> = ({
  orderId,
  address,
  onContinueShopping,
  className,
}) => {
  const t = useTranslations();
  const router = useRouter();

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      router.push('/products');
    }
  };

  return (
    <div className={cn('space-y-6 p-4 md:p-6', className)}>
      {/* Success Icon and Message */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="rounded-full bg-green-50 p-6 dark:bg-green-950">
          <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {t('OrderSuccess.title')}
          </h1>
          <p className="text-muted-foreground">{t('OrderSuccess.message')}</p>
          {orderId && (
            <p className="text-sm text-muted-foreground">
              {t('OrderSuccess.orderId')}:{' '}
              <span className="font-mono font-medium text-foreground">
                #{orderId}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Delivery Address Details */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5" />
          {t('OrderSuccess.deliveryDetails')}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              {t('CartPage.name')}
            </p>
            <p className="font-medium">{address.customer_name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t('CartPage.phone')}
            </p>
            <p className="font-medium" dir="ltr">
              {address.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              {t('CartPage.email')}
            </p>
            <p className="font-medium">{address.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              {t('CartPage.country')}
            </p>
            <p className="font-medium capitalize">{address.country}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t('CartPage.city')}
            </p>
            <p className="font-medium capitalize">{address.city}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t('CartPage.region')}
            </p>
            <p className="font-medium capitalize">{address.region}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              {t('CartPage.address')}
            </p>
            <p className="font-medium">{address.address}</p>
          </div>

          {address.postal_code && (
            <div>
              <p className="text-sm text-muted-foreground">
                {t('CartPage.postalCode')}
              </p>
              <p className="font-medium">{address.postal_code}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={handleContinueShopping}
          variant="outline"
          size="lg"
          className="w-full rounded-full sm:w-auto sm:flex-1"
        >
          <ShoppingBag className="h-5 w-5" />
          {t('OrderSuccess.continueShopping')}
        </Button>
      </div>

      {/* Additional Information */}
      <div className="rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
        <p>{t('OrderSuccess.confirmationNote')}</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
