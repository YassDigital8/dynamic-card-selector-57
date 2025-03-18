
import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  
  return (
    <Breadcrumb className={cn(`mb-${isMobile ? '3' : '6'}`, className)}>
      <BreadcrumbList className={`text-xs ${isMobile ? '' : 'md:text-sm'}`}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center gap-1 hover:text-primary">
              <Home className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
              <span className={isMobile ? "sr-only" : "hidden sm:inline"}>Home</span>
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
                    {item.icon && <item.icon className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />}
                    <span>{item.label}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={item.href || "#"} 
                      className="flex items-center gap-1 hover:text-primary text-xs md:text-sm"
                    >
                      {item.icon && <item.icon className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />}
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
