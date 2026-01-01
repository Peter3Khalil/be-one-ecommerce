'use client';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn, detectLang } from '@/lib/utils';
import { useCart } from '@/modules/cart/components/cart-provider';
import { useCategoriesQuery } from '@/modules/products/queries';
import { Button } from '@ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/collapsible';
import CustomNavigationMenu from '@ui/custom-navigation-menu';
import { Input } from '@ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@ui/sheet';
import {
  ChevronRight,
  Home,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { parseAsString, useQueryStates } from 'nuqs';
import { Activity, useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './language-switcher';
import ThemeToggle from './theme-toggle';
const Header = () => {
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const { count } = useCart();
  const navItems = useNavItems();
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: categoriesData } = useCategoriesQuery();
  const categories = categoriesData?.data.data || [];
  const [query, setQuery] = useQueryStates({
    product_name: parseAsString.withDefault(''),
    offset: parseAsString.withDefault('0'),
  });
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  useEffect(() => {
    if (isSearchOpened) {
      inputRef.current?.focus();
    }
  }, [isSearchOpened]);
  return (
    <>
      {/* Desktop Header */}
      <header
        className={cn(
          'sticky top-0 z-50 hidden h-16 items-center border-b bg-background sm:flex',
          {
            'py-0': isSearchOpened,
          }
        )}
      >
        {!isSearchOpened && (
          <div className="container flex items-center justify-between gap-8">
            <nav className="flex items-center sm:gap-8">
              <MobileMenu categories={categories.map(({ name }) => name)} />

              <Link
                href="/"
                className="text-3xl leading-none font-bold text-nowrap"
                lang="en"
                // eslint-disable-next-line i18next/no-literal-string
              >
                Be One.
              </Link>
              <div className="hidden items-center gap-4 sm:flex">
                <ul className="items-center gap-4 text-sm font-medium sm:flex">
                  {navItems.map((item) => (
                    <li
                      key={item.href}
                      className="text-muted-foreground duration-200 hover:text-foreground"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
                <CustomNavigationMenu
                  title={t('Global.categories')}
                  items={categories.map(({ name }) => ({
                    title: name,
                    href: `/products?category_name=${name}`,
                  }))}
                />
              </div>
            </nav>

            <div className="flex w-fit items-center gap-4">
              <Input
                type="search"
                placeholder={t('Global.searchProductsPlaceholder')}
                className="hidden rounded-full border px-4 py-2 md:block lg:w-80"
                onChange={(e) =>
                  setQuery({ product_name: e.target.value, offset: '0' })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && pathname !== '/products') {
                    router.push({
                      pathname: '/products',
                      query: { product_name: query.product_name },
                    });
                  }
                }}
                value={query.product_name}
              />
              {pathname !== '/products' && (
                <Button
                  variant="secondary"
                  className="hidden rounded-full text-muted-foreground duration-100 hover:text-secondary-foreground lg:flex"
                  size="icon"
                  onClick={() => {
                    router.push({
                      pathname: '/products',
                      query: { product_name: query.product_name },
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
                  <Link href="/cart" className="relative">
                    <ShoppingCart />
                    {count > 0 && (
                      <span className="absolute end-0 -top-1 inline-flex aspect-square size-5 items-center justify-center rounded-full bg-red-600 p-1 text-xs leading-none font-bold text-red-100">
                        {count}
                      </span>
                    )}
                  </Link>
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
              value={query.product_name}
              onChange={(e) =>
                setQuery({ product_name: e.target.value, offset: '0' })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && pathname !== '/products') {
                  router.push({
                    pathname: '/products',
                    query: { product_name: query.product_name },
                  });
                }
              }}
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
                    query: { product_name: query.product_name },
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

      {/* Mobile Top Header - Simple with logo */}
      <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4 sm:hidden">
        <Link
          href="/"
          className="text-2xl leading-none font-bold text-nowrap"
          lang="en"
          // eslint-disable-next-line i18next/no-literal-string
        >
          Be One.
        </Link>
        <div className="ms-auto flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 border-t bg-background sm:hidden">
        <div className="flex h-16 items-center justify-around">
          <Link
            href="/"
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors',
              pathname === '/' && 'text-primary'
            )}
          >
            <Home className="size-5" />
            <span className="text-xs">{t('HomePage.home')}</span>
          </Link>

          <Link
            href="/products"
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors',
              pathname === '/products' && 'text-primary'
            )}
          >
            <ShoppingBag className="size-5" />
            <span className="text-xs">{t('ProductsPage.products')}</span>
          </Link>

          <button
            onClick={() => setIsSearchOpened(true)}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors"
          >
            <Search className="size-5" />
            <span className="text-xs">{t('Global.search')}</span>
          </button>
          <Link
            href="/cart"
            className={cn(
              'relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors',
              pathname === '/cart' && 'text-primary'
            )}
          >
            <div className="relative">
              <ShoppingCart className="size-5" />
              {count > 0 && (
                <span className="absolute -end-2 -top-1 inline-flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] leading-none font-bold text-red-100">
                  {count}
                </span>
              )}
            </div>
            <span className="text-xs">{t('Global.cart')}</span>
          </Link>
          <MobileMenu categories={categories.map(({ name }) => name)} />
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isSearchOpened && (
        <div className="fixed inset-0 z-60 bg-background sm:hidden">
          <div className="flex h-14 items-center gap-2 border-b px-4">
            <Input
              type="search"
              className="h-10 flex-1"
              placeholder={t('Global.searchProductsPlaceholder')}
              value={query.product_name}
              onChange={(e) =>
                setQuery({ product_name: e.target.value, offset: '0' })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push({
                    pathname: '/products',
                    query: { product_name: query.product_name },
                  });
                  setIsSearchOpened(false);
                }
              }}
              ref={inputRef}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (query.product_name) {
                  router.push({
                    pathname: '/products',
                    query: { product_name: query.product_name },
                  });
                  setIsSearchOpened(false);
                }
              }}
            >
              <Search className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpened(false)}
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

type MobileMenuProps = {
  categories?: string[];
};
const MobileMenu = ({ categories = [] }: MobileMenuProps) => {
  const navItems = useNavItems();
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors sm:hidden">
          <Menu className="size-5" />
          <span className="text-xs">{t('Global.menu')}</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="block pb-0">
          <Link
            href="/"
            className="text-3xl leading-none font-bold text-nowrap"
            lang="en"
            onClick={() => {
              setOpen(false);
            }}
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
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Collapsible className="group/collapsible">
            <CollapsibleTrigger className="flex w-full items-center rounded-md px-4 py-3 hover:bg-accent/50">
              <span>{t('Global.categories')}</span>
              <ChevronRight
                size={20}
                className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4">
              {categories.map((name) => (
                <Link
                  key={name}
                  href={`/products?category_name=${name}`}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                    {
                      arabic: detectLang(name) === 'ar',
                      english: detectLang(name) === 'en',
                    }
                  )}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {name}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const useNavItems = () => {
  const t = useTranslations();
  return [
    { label: t('HomePage.home'), href: '/' },
    {
      label: t('ProductsPage.products'),
      href: '/products',
    },
  ];
};

export default Header;
