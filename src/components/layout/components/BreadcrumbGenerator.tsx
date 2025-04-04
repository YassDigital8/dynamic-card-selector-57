
import React from 'react';
import { useLocation } from 'react-router-dom';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';

interface BreadcrumbGeneratorProps {
  showOnHomepage?: boolean;
}

const BreadcrumbGenerator: React.FC<BreadcrumbGeneratorProps> = ({ showOnHomepage = false }) => {
  const location = useLocation();
  
  if (!showOnHomepage && location.pathname === '/') {
    return null;
  }
  
  const breadcrumbItems = getBreadcrumbItems(location.pathname);
  
  return (
    <BreadcrumbNav 
      items={[
        { label: 'Dashboard', href: '/' },
        ...breadcrumbItems
      ]}
    />
  );
};

const getBreadcrumbItems = (path: string) => {
  if (path === '/') {
    return [];
  }
  
  const segments = path.split('/').filter(Boolean);
  const items = [];
  
  segments.forEach((segment, index) => {
    const currentPath = `/${segments.slice(0, index + 1).join('/')}`;
    const isLastSegment = index === segments.length - 1;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    
    items.push({
      label,
      href: isLastSegment ? undefined : currentPath
    });
  });
  
  return items;
};

export default BreadcrumbGenerator;
