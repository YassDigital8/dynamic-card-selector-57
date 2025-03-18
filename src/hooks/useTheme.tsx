
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
      return savedTheme;
    }
    
    // Default to system if no valid theme is saved
    return 'system';
  });

  // Get the effective theme (resolving 'system' to either 'light' or 'dark')
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme === 'dark' ? 'dark' : 'light';
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        setEffectiveTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Update effective theme when theme changes
  useEffect(() => {
    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setEffectiveTheme(systemPrefersDark ? 'dark' : 'light');
    } else {
      setEffectiveTheme(theme === 'dark' ? 'dark' : 'light');
    }
  }, [theme]);

  // Update document class when effective theme changes with smooth transition
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Add transition class before changing theme
    root.classList.add('theme-transition');
    
    // Set timeout to ensure transition is applied before changing theme
    setTimeout(() => {
      if (effectiveTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      // Remove transition class after theme change
      setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 300);
    }, 10);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [effectiveTheme, theme]);

  // Set specific theme
  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return { 
    theme, 
    effectiveTheme,
    setTheme: setThemeMode,
    isSystem: theme === 'system',
    isDark: effectiveTheme === 'dark',
    isLight: effectiveTheme === 'light'
  };
}
