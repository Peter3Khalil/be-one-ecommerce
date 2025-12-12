'use client';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@ui/sheet';
import { cn } from '@/lib/utils';
import { CircleUserRound, Menu, Search, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { Activity, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Summer', href: '#' },
  { label: 'Winter', href: '#' },
];
const Header = () => {
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  return (
    <header
      className={cn('flex h-16 items-center border-b', {
        'py-0': isSearchOpened,
      })}
    >
      {!isSearchOpened && (
        <div className="container flex items-center justify-between gap-8">
          <nav className="flex items-center sm:gap-8">
            <MobileMenu />
            <Link
              href="/"
              className="text-3xl leading-none font-bold text-nowrap"
            >
              Be One.
            </Link>
            <ul className="hidden items-center gap-4 sm:flex">
              {NAV_ITEMS.map((item) => (
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
              placeholder="Search products..."
              className="hidden rounded-full border px-4 py-2 md:block lg:w-80"
            />
            <div className="shrink-0">
              <Button
                variant="ghost"
                className="text-muted-foreground duration-200 hover:text-foreground md:hidden"
                size="icon"
                onClick={() => setIsSearchOpened(true)}
              >
                <Search />
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground duration-200 hover:text-foreground"
                size="icon"
              >
                <ShoppingCart />
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground duration-200 hover:text-foreground"
                size="icon"
              >
                <CircleUserRound />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Activity mode={isSearchOpened ? 'visible' : 'hidden'}>
        <div className="flex h-full w-full items-center gap-2 px-2 py-2">
          <Input
            className="h-full max-w-full"
            placeholder="Search products..."
          />
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
          >
            Be One.
          </Link>
        </SheetHeader>
        <nav className="px-2">
          <ul>
            {NAV_ITEMS.map((item) => (
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

export default Header;
