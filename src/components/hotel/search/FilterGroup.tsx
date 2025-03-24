
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, children }) => {
  return (
    <div className="space-y-2">
      <div className="font-medium text-sm">{title}</div>
      <Separator />
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export default FilterGroup;
