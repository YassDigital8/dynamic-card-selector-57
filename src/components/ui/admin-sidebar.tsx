
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Hotel, 
  Users, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
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
      <div className="mt-auto p-4 border-t border-sidebar-border flex items-center text-sm text-muted-foreground">
        <HelpCircle className="mr-2 h-4 w-4" />
        <span>Need help?</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
