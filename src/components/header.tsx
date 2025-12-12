import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleUserRound, Menu, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const NAV_ITEMS = [
    { label: 'Home', href: '#' },
    { label: 'Summer', href: '#' },
    { label: 'Winter', href: '#' },
  ];
  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-between gap-8">
        <nav className="flex items-center sm:gap-8">
          <Button
            variant="ghost"
            className="me-1 text-muted-foreground duration-200 hover:text-foreground sm:hidden"
            size="icon"
          >
            <Menu />
          </Button>
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
    </header>
  );
};

export default Header;
