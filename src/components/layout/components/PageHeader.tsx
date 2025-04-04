
import React from 'react';
import { useLocation } from 'react-router-dom';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import LogoutButton from '@/components/auth/LogoutButton';
import useApiStatus from '@/hooks/useApiStatus';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';

interface PageHeaderProps {
  pageTitle?: string;
  pageDescription?: string;
}

// Define route mapping for better breadcrumb labels
const routeLabels: Record<string, string> = {
  'hotel': 'Hotel Network',
  'gallery': 'Media Gallery',
  'users': 'Users',
  'events': 'Events & Attractions',
  'settings': 'Settings',
  'add': 'Add New',
  'edit': 'Edit',
  'view': 'View Details',
};

// Define module structure for hierarchical breadcrumbs
const moduleStructure: Record<string, { parent: string | null; title: string }> = {
  'users': { parent: null, title: 'Users' },
  'hotel': { parent: null, title: 'Hotel Network' },
  'gallery': { parent: null, title: 'Media Gallery' },
  'events': { parent: null, title: 'Events & Attractions' },
  'settings': { parent: null, title: 'Settings' },
  
  // Hotel sub-modules
  'add': { parent: 'hotel', title: 'Add New' },
  'edit': { parent: 'hotel', title: 'Edit' },
  'view': { parent: 'hotel', title: 'View Details' },
  
  // Add more sub-modules as needed
};

const PageHeader: React.FC<PageHeaderProps> = ({ pageTitle, pageDescription }) => {
  const location = useLocation();
  const { isApiLive } = useApiStatus();
  
  // Generate breadcrumb items based on current route
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    
    // Skip breadcrumbs on main pages
    if (path === '/' || path === '/login') {
      return [];
    }
    
    const segments = path.split('/').filter(Boolean);
    
    // Don't show breadcrumbs if we're on a top-level page
    // This ensures we don't have a single breadcrumb item which isn't useful
    if (segments.length <= 1) {
      return [];
    }
    
    // Build breadcrumb items in hierarchical order
    const breadcrumbItems = [];
    let currentPath = '';
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;
      
      // Format the segment name - use predefined labels or capitalize first letter
      let label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // For dynamic IDs in routes, try to make them more readable
      if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        label = 'ID: ' + segment.substring(0, 8) + '...';
      }
      
      // Check if this is a numeric ID or other parameter
      if (segment.match(/^\d+$/)) {
        label = `Item ${segment}`;
      }
      
      const isLastSegment = i === segments.length - 1;
      
      // Add this segment to the breadcrumb trail
      breadcrumbItems.push({
        label,
        href: isLastSegment ? undefined : currentPath
      });
    }
    
    return breadcrumbItems;
  };
  
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 mb-6">
      <BreadcrumbNav 
        items={getBreadcrumbItems()}
      />
      
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
  );
};

export default PageHeader;
