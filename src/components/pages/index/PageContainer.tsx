
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
  Image
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
          <SidebarHeader className="border-b border-sidebar-border py-2 px-2 md:py-4 md:px-3">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Logo showText={!isMobile} />
              </Link>
              <div className="flex items-center gap-1 md:gap-2">
                <ThemeToggle />
                {!isMobile && <SidebarTrigger />}
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] md:text-xs">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link to="/" className="w-full">
                      <SidebarMenuButton 
                        isActive={window.location.pathname === '/'} 
                        tooltip="Dashboard" 
                        size={isMobile ? "sm" : "default"}
                      >
                        <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <Link to="/pages" className="w-full">
                      <SidebarMenuButton 
                        tooltip="Pages" 
                        isActive={window.location.pathname === '/pages'}
                        size={isMobile ? "sm" : "default"}
                      >
                        <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Pages</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <Link to="/gallery" className="w-full">
                      <SidebarMenuButton 
                        tooltip="Gallery" 
                        isActive={window.location.pathname === '/gallery'}
                        size={isMobile ? "sm" : "default"}
                      >
                        <Image className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Gallery</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <Link to="/users" className="w-full">
                      <SidebarMenuButton 
                        tooltip="Users" 
                        isActive={window.location.pathname === '/users'}
                        size={isMobile ? "sm" : "default"}
                      >
                        <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Users</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <Link to="/settings" className="w-full">
                      <SidebarMenuButton 
                        tooltip="Settings" 
                        isActive={window.location.pathname === '/settings'}
                        size={isMobile ? "sm" : "default"}
                      >
                        <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Settings</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border p-2 md:p-4">
            <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Need help?</span>
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8">
                <div className="mb-3 md:mb-0">
                  <h1 className="text-xl md:text-3xl font-bold text-foreground">Page Navigator</h1>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">Manage pages across different POS and languages</p>
                </div>
                <div className="flex items-center gap-2 self-start">
                  <Logo showText={false} className="mr-1 md:mr-2" />
                  <span className="text-xs md:text-sm text-primary bg-secondary px-2 py-1 rounded-full">
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
