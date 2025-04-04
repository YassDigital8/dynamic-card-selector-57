
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Hotel, 
  Users, 
  Settings,
  HelpCircle,
  Ticket,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useAuthentication from '@/hooks/useAuthentication';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { userInfo, logout } = useAuthentication();
  
  const isActive = (path: string) => {
    if (path === '/hotel' && location.pathname.startsWith('/hotel/')) {
      return true;
    }
    return location.pathname === path;
  };
  
  const navItems = [
    { 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      href: '/' 
    },
    { 
      label: 'Pages', 
      icon: FileText, 
      href: '/pages' 
    },
    { 
      label: 'Gallery', 
      icon: Image, 
      href: '/gallery' 
    },
    { 
      label: 'Hotel Network', 
      icon: Hotel, 
      href: '/hotel'
    },
    {
      label: 'Events & Attractions',
      icon: Ticket,
      href: '/events'
    },
    { 
      label: 'Users', 
      icon: Users, 
      href: '/users' 
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      href: '/settings' 
    },
  ];
  
  return (
    <div className="bg-sidebar text-sidebar-foreground h-screen w-64 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold">
          <span className="text-primary">ADMIN</span> DASHBOARD
        </h1>
      </div>
      
      {/* Navigation */}
      <div className="p-4">
        <h2 className="text-sm mb-3 text-muted-foreground">Navigation</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm group",
                isActive(item.href) 
                  ? "bg-accent text-accent-foreground font-medium" 
                  : "hover:bg-accent/50 text-sidebar-foreground"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Footer */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Need help?</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm hover:text-foreground">
              <span className="max-w-[100px] truncate">{userInfo?.firstName || 'User'}</span>
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {userInfo?.role && (
                <>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    {userInfo.role}
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
