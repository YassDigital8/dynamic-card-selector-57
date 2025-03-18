
import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <Breadcrumb className={cn("mb-4 md:mb-6", className)}>
      <BreadcrumbList className="text-xs md:text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center gap-1 hover:text-primary">
              <Home className="h-3 w-3 md:h-4 md:w-4" />
              <span className="sr-only md:not-sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        </BreadcrumbSeparator>
        
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          
          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage className="flex items-center gap-1 text-xs md:text-sm">
                    {item.icon && <item.icon className="h-3 w-3 md:h-4 md:w-4" />}
                    <span>{item.label}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={item.href || "#"} 
                      className="flex items-center gap-1 hover:text-primary text-xs md:text-sm"
                    >
                      {item.icon && <item.icon className="h-3 w-3 md:h-4 md:w-4" />}
                      <span>{item.label}</span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {!isLastItem && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
