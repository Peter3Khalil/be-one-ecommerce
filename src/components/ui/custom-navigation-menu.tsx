import { Link } from '@/i18n/navigation';
import { FC } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';
import { cn, detectLang } from '@/lib/utils';
type Props = {
  items?: Array<{ title: string; href: string }>;
  title: string;
};
const CustomNavigationMenu: FC<Props> = ({ items = [], title }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="max-h-[400px] overflow-auto">
            {items.map((item) => (
              <NavigationMenuLink
                key={item.title}
                className={cn('w-[150px]', {
                  arabic: detectLang(item.title) === 'ar',
                  english: detectLang(item.title) === 'en',
                })}
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CustomNavigationMenu;
