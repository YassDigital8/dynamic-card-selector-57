
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxFilterProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  id,
  label,
  checked,
  onCheckedChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked === true)}
        className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
      />
      <label 
        htmlFor={id} 
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxFilter;
