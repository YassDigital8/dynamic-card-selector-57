
import { useLocation } from 'react-router-dom';

export const useBreadcrumbItems = () => {
  const location = useLocation();
  
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
  
  return { getBreadcrumbItems };
};
