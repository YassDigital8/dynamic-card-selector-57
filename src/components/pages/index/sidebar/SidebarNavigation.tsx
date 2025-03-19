
import React from 'react';
import { SidebarMenu } from '@/components/ui/sidebar';
import { 
  FileText, 
  Image, 
  Hotel, 
  Users, 
  Settings 
} from 'lucide-react';
import NavItem from './NavItem';

const SidebarNavigation = () => {
  return (
    <SidebarMenu>
      <NavItem 
        to="/" 
        icon={FileText} 
        label="Dashboard" 
      />
      
      <NavItem 
        to="/pages" 
        icon={FileText} 
        label="Pages" 
      />
      
      <NavItem 
        to="/gallery" 
        icon={Image} 
        label="Gallery" 
      />
      
      <NavItem 
        to="/hotel" 
        icon={Hotel} 
        label="Hotel Network" 
      />
      
      <NavItem 
        to="/users" 
        icon={Users} 
        label="Users" 
      />
      
      <NavItem 
        to="/settings" 
        icon={Settings} 
        label="Settings" 
      />
    </SidebarMenu>
  );
};

export default SidebarNavigation;
