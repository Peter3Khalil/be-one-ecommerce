'use client';

import { Button } from '@ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      className="text-muted-foreground duration-200 hover:text-foreground"
      size="icon-sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeToggle;
