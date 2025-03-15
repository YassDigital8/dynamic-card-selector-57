
import React from 'react';
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
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  HelpCircle,
  PlusCircle 
} from 'lucide-react';

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
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-gray-200">
            <div className="flex items-center gap-2 px-3 py-4">
              <LayoutDashboard className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Admin Portal</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={true} tooltip="Dashboard">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Pages">
                      <FileText />
                      <span>Pages</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Users">
                      <Users />
                      <span>Users</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              <span>Need help?</span>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="p-6 md:p-10">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Page Navigator</h1>
                  <p className="text-gray-500 mt-1">Manage pages across different POS and languages</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                  Demo Mode
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {children}
              </div>
              
            </motion.div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PageContainer;
