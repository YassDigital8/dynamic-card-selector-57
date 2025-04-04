
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HomeIcon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
  // If there are no items, don't render the breadcrumb
  if (items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className={cn("mb-4", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center hover:text-primary transition-colors">
              <HomeIcon className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, i) => (
          <BreadcrumbItem key={`${item.label}-${i}`}>
            <BreadcrumbSeparator />
            {item.href ? (
              <BreadcrumbLink asChild>
                <Link
                  to={item.href}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                  <span>{item.label}</span>
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="flex items-center font-medium">
                {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                <span>{item.label}</span>
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
