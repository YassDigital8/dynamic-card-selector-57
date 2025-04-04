
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Image, Hotel, Users, Settings, Ticket, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    if (path === '/') return location.pathname === path;
    // For nested routes like /hotel/add, /hotel/edit, etc.
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Pages', icon: FileText, path: '/pages' },
    { name: 'Gallery', icon: Image, path: '/gallery' },
    { name: 'Hotel Network', icon: Hotel, path: '/hotel' },
    { name: 'Events & Attractions', icon: Ticket, path: '/events' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="h-full w-64 flex-shrink-0 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col">
        {/* Header with logo */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <Link to="/" className="flex items-center">
            <Logo showText={true} />
          </Link>
          <ThemeToggle />
        </div>
        
        {/* Navigation items */}
        <div className="flex-1 overflow-auto py-2">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActiveRoute(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Need help?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
