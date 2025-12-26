'use client';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React, { FC, Suspense } from 'react';
type Props = Omit<React.ComponentProps<typeof Link>, 'href' | 'locale'>;
const LanguageSwitcher: FC<Props> = ({ className, children, ...props }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  return (
    <Button
      variant="ghost"
      className={cn(
        'text-xs leading-0 text-muted-foreground duration-200 hover:text-foreground',
        className
      )}
      size="icon-sm"
      asChild
    >
      <Link
        href={`${pathname}?${searchParams}`}
        locale={locale === 'en' ? 'ar' : 'en'}
        lang="en"
        {...props}
      >
        {}
        {children || `${locale === 'en' ? 'AR' : 'EN'}`}
      </Link>
    </Button>
  );
};

const Wrapper: FC<Props> = (props) => (
  <Suspense>
    <LanguageSwitcher {...props} />
  </Suspense>
);

export default Wrapper;
