
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HomeIcon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const BreadcrumbNav = ({ items, className }: BreadcrumbNavProps) => {
  return (
    <div className={cn("flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4", className)}>
      <Link
        to="/"
        className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        <HomeIcon className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, i) => (
        <React.Fragment key={`${item.label}-${i}`}>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-600" />
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              <span>{item.label}</span>
            </Link>
          ) : (
            <div className="flex items-center text-gray-800 dark:text-gray-200 font-medium">
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              <span>{item.label}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
