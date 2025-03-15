
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    toast(`${theme === 'light' ? 'Dark' : 'Light'} mode activated`, {
      description: `Switched to ${theme === 'light' ? 'dark' : 'light'} mode`,
      position: 'bottom-right',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          toast('Light mode activated', {
            description: 'Switched to light mode',
            position: 'bottom-right',
          });
        }}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          toast('Dark mode activated', {
            description: 'Switched to dark mode',
            position: 'bottom-right',
          });
        }}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggle}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
