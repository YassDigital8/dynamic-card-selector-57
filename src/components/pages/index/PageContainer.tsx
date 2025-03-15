
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarGroupContent,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  FileText, 
  Settings, 
  Users, 
  HelpCircle,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageContainerProps {
  children: React.ReactNode;
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

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center justify-between px-3 py-4">
              <Link to="/">
                <Logo showText={!isMobile} />
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                {!isMobile && <SidebarTrigger />}
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link to="/" className="w-full">
                      <SidebarMenuButton isActive={window.location.pathname === '/'} tooltip="Dashboard">
                        <FileText />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <Link to="/pages" className="w-full">
                      <SidebarMenuButton tooltip="Pages" isActive={window.location.pathname === '/pages'}>
                        <FileText />
                        <span>Pages</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <Link to="/users" className="w-full">
                      <SidebarMenuButton tooltip="Users" isActive={window.location.pathname === '/users'}>
                        <Users />
                        <span>Users</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <Link to="/settings" className="w-full">
                      <SidebarMenuButton tooltip="Settings" isActive={window.location.pathname === '/settings'}>
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              <span>Need help?</span>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="p-3 sm:p-6 md:p-10">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">Page Navigator</h1>
                  <p className="text-muted-foreground mt-1">Manage pages across different POS and languages</p>
                </div>
                <div className="flex items-center gap-2 self-start">
                  <Logo showText={false} className="mr-2" />
                  <span className="text-sm text-primary bg-secondary px-3 py-1 rounded-full">
                    Demo Mode
                  </span>
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

export default PageContainer;
