
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    
    const descriptions = {
      light: 'Bright mode activated - easier on the eyes in daylight',
      dark: 'Dark mode activated - easier on the eyes at night',
      system: 'Using your system preference for theme'
    };
    
    toast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} theme`, {
      description: descriptions[newTheme],
      position: 'bottom-right',
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={cn(
            "rounded-full w-9 h-9 border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80",
            "relative overflow-hidden transition-all duration-300"
          )}
        >
          <Sun className={cn(
            "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500",
            effectiveTheme === 'dark' ? "rotate-90 scale-0" : ""
          )} />
          <Moon className={cn(
            "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500",
            effectiveTheme === 'dark' ? "rotate-0 scale-100" : ""
          )} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 backdrop-blur-sm bg-popover/95 border border-border/50">
        <DropdownMenuItem 
          onClick={() => handleThemeChange('light')}
          className={cn(
            "flex items-center gap-2 cursor-pointer transition-colors",
            theme === 'light' && "bg-primary/10 font-medium"
          )}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && (
            <motion.div 
              layoutId="activeTheme"
              className="ml-auto h-2 w-2 rounded-full bg-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleThemeChange('dark')}
          className={cn(
            "flex items-center gap-2 cursor-pointer transition-colors",
            theme === 'dark' && "bg-primary/10 font-medium"
          )}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && (
            <motion.div 
              layoutId="activeTheme"
              className="ml-auto h-2 w-2 rounded-full bg-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleThemeChange('system')}
          className={cn(
            "flex items-center gap-2 cursor-pointer transition-colors",
            theme === 'system' && "bg-primary/10 font-medium"
          )}
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === 'system' && (
            <motion.div 
              layoutId="activeTheme"
              className="ml-auto h-2 w-2 rounded-full bg-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
