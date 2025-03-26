
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
  PlusCircle,
  ListFilter,
  ActivitySquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
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
      href: '/hotel',
      subItems: [
        {
          label: 'All Hotels',
          icon: ListFilter,
          href: '/hotel'
        },
        {
          label: 'Add New Hotel',
          icon: PlusCircle,
          href: '/hotel/add'
        }
      ]
    },
    { 
      label: 'Users', 
      icon: Users, 
      href: '/users',
      subItems: [
        {
          label: 'User Management',
          icon: Users,
          href: '/users'
        },
        {
          label: 'Activity Logs',
          icon: ActivitySquare,
          href: '/user-logs'
        }
      ]
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
            <React.Fragment key={item.label}>
              <Link 
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
              
              {/* Show subitems if expanded and there are subitems */}
              {item.subItems && isActive(item.href) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      to={subItem.href}
                      className={cn(
                        "flex items-center px-3 py-1.5 rounded-md text-xs group",
                        location.pathname === subItem.href
                          ? "bg-accent/80 text-accent-foreground font-medium"
                          : "hover:bg-accent/30 text-sidebar-foreground"
                      )}
                    >
                      <subItem.icon className="mr-2 h-3.5 w-3.5" />
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
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
