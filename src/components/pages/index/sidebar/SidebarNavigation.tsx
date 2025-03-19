
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SidebarContent, SidebarGroup } from '@/components/ui/sidebar';
import { PanelLeft, Layers, Hotel, ImageIcon, FolderArchive, Users, Settings } from 'lucide-react';
import NavItem from './NavItem';

const SidebarNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarContent className="px-1 py-2">
      <SidebarGroup title="Core">
        <NavItem 
          icon={<PanelLeft className="h-4 w-4" />}
          title="Dashboard"
          to="/"
          isActive={currentPath === '/' || currentPath === '/pages'}
        />
        <NavItem 
          icon={<Layers className="h-4 w-4" />}
          title="Content"
          to="/pages"
          isActive={currentPath === '/pages'}
        />
        <NavItem 
          icon={<Hotel className="h-4 w-4" />}
          title="Hotels"
          to="/hotel"
          isActive={currentPath.startsWith('/hotel')}
        />
        <NavItem 
          icon={<ImageIcon className="h-4 w-4" />}
          title="Media Gallery"
          to="/gallery"
          isActive={currentPath.startsWith('/gallery')}
        />
      </SidebarGroup>
      
      <SidebarGroup title="Management">
        <NavItem 
          icon={<FolderArchive className="h-4 w-4" />}
          title="Archives"
          to="/archives"
          isActive={currentPath.startsWith('/archives')}
        />
        <NavItem 
          icon={<Users className="h-4 w-4" />}
          title="Users"
          to="/users"
          isActive={currentPath.startsWith('/users')}
        />
        <NavItem 
          icon={<Settings className="h-4 w-4" />}
          title="Settings"
          to="/settings"
          isActive={currentPath.startsWith('/settings')}
        />
      </SidebarGroup>
    </SidebarContent>
  );
};

export default SidebarNavigation;
