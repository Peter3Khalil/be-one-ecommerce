'use client';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@ui/sheet';
import { CircleUserRound, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { Activity, useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './language-switcher';
import ThemeToggle from './theme-toggle';

const Header = () => {
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const navItems = useNavItems();
  const inputRef = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useQueryState(
    'product_name',
    parseAsString.withDefault('')
  );
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  useEffect(() => {
    if (isSearchOpened) {
      inputRef.current?.focus();
    }
  }, [isSearchOpened]);
  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-16 items-center border-b bg-background',
        {
          'py-0': isSearchOpened,
        }
      )}
    >
      {!isSearchOpened && (
        <div className="container flex items-center justify-between gap-8">
          <nav className="flex items-center sm:gap-8">
            <MobileMenu />
            <Link
              href="/"
              className="text-3xl leading-none font-bold text-nowrap"
              lang="en"
              // eslint-disable-next-line i18next/no-literal-string
            >
              Be One.
            </Link>
            <ul className="hidden items-center gap-4 sm:flex">
              {navItems.map((item) => (
                <li
                  key={item.href}
                  className="text-muted-foreground duration-200 hover:text-foreground"
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex w-fit items-center gap-4">
            <Input
              type="search"
              placeholder={t('Global.searchProductsPlaceholder')}
              className="hidden rounded-full border px-4 py-2 md:block lg:w-80"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            {pathname !== '/products' && (
              <Button
                variant="secondary"
                className="hidden rounded-full text-muted-foreground duration-100 hover:text-secondary-foreground lg:flex"
                size="icon"
                onClick={() => {
                  router.push({
                    pathname: '/products',
                    query: { product_name: productName },
                  });
                }}
              >
                <Search className="size-4" />
              </Button>
            )}
            <div className="flex shrink-0 items-center">
              <Button
                variant="ghost"
                className="text-muted-foreground duration-200 hover:text-foreground md:hidden"
                size="icon-sm"
                onClick={() => setIsSearchOpened(true)}
              >
                <Search />
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground duration-200 hover:text-foreground"
                size="icon-sm"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart />
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground duration-200 hover:text-foreground"
                size="icon-sm"
              >
                <CircleUserRound />
              </Button>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}

      <Activity mode={isSearchOpened ? 'visible' : 'hidden'}>
        <div className="flex h-full w-full items-center gap-2 px-2 py-2">
          <Input
            type="search"
            className="h-full max-w-full"
            placeholder={t('Global.searchProductsPlaceholder')}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            ref={inputRef}
          />
          {pathname !== '/products' && (
            <Button
              variant="secondary"
              className="rounded-full text-muted-foreground duration-100 hover:text-secondary-foreground"
              size="icon"
              onClick={() => {
                router.push({
                  pathname: '/products',
                  query: { product_name: productName },
                });
              }}
            >
              <Search className="size-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            className="text-muted-foreground duration-200 hover:text-foreground"
            size="icon"
            onClick={() => setIsSearchOpened(false)}
          >
            <X />
          </Button>
        </div>
      </Activity>
    </header>
  );
};

const MobileMenu = () => {
  const navItems = useNavItems();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="me-1 text-muted-foreground duration-200 hover:text-foreground sm:hidden"
          size="icon"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="block pb-0">
          <Link
            href="/"
            className="text-3xl leading-none font-bold text-nowrap"
            lang="en"
            // eslint-disable-next-line i18next/no-literal-string
          >
            Be One.
          </Link>
        </SheetHeader>
        <nav className="px-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block rounded-md px-4 py-3 hover:bg-accent/50"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const useNavItems = () => {
  const t = useTranslations();
  return [
    { label: t('HomePage.home'), href: '#' },
    { label: t('Global.summerCollection'), href: '#' },
    { label: t('Global.winterCollection'), href: '#' },
  ];
};

export default Header;
