
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';
import { LayoutDashboard, FileText, Image, Hotel, Users, Settings, HelpCircle, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import LogoutButton from '@/components/auth/LogoutButton';
import { motion } from 'framer-motion';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import useApiStatus from '@/hooks/useApiStatus';

interface StandardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const StandardLayout: React.FC<StandardLayoutProps> = ({ children, pageTitle, pageDescription }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isApiLive } = useApiStatus();
  
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

  // Generate breadcrumb items based on current route
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [];
    
    if (path === '/') {
      return [{ label: 'Dashboard' }];
    }
    
    const segments = path.split('/').filter(Boolean);
    
    segments.forEach((segment, index) => {
      // Build the path up to this segment
      const currentPath = `/${segments.slice(0, index + 1).join('/')}`;
      
      // Only add links for segments before the last one
      const isLastSegment = index === segments.length - 1;
      
      // Format the segment name - capitalize first letter
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Add this segment to the breadcrumb trail
      items.push({
        label,
        href: isLastSegment ? undefined : currentPath
      });
    });
    
    return items;
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border py-2 px-2 md:py-4 md:px-3">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Logo showText={true} />
              </Link>
              <div className="flex items-center gap-1 md:gap-2">
                <ThemeToggle />
                <SidebarTrigger />
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] md:text-xs">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <Link to={item.href} className="w-full">
                        <SidebarMenuButton 
                          isActive={isActive(item.href)} 
                          tooltip={item.label} 
                          size={isMobile ? "sm" : "default"}
                        >
                          <item.icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          <span className="text-xs md:text-sm">{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border p-2 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Need help?</span>
              </div>
              <LogoutButton variant="ghost" size="sm" showIcon={false} />
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="p-2 sm:p-4 md:p-8 lg:p-10">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
            >
              <div className="flex flex-col space-y-4 md:space-y-6 mb-6">
                {location.pathname !== '/' && (
                  <BreadcrumbNav 
                    items={[
                      { label: 'Dashboard', href: '/' },
                      ...getBreadcrumbItems()
                    ]}
                  />
                )}
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-3 md:mb-0">
                    <h1 className="text-xl md:text-3xl font-bold text-foreground">{pageTitle || "Admin Dashboard"}</h1>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{pageDescription || "Manage your application settings"}</p>
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    <SessionTimer />
                    <ApiStatusIndicator isLive={isApiLive} />
                    <LogoutButton 
                      variant="outline" 
                      size="sm" 
                      className="ml-2" 
                    />
                  </div>
                </div>
              </div>
              
              {children}
            </motion.div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StandardLayout;
