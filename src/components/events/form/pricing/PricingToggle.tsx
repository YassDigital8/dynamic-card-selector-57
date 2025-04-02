
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface PricingToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({ checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2 pt-2">
      <Switch
        id="multiple-ticket-types"
        checked={checked}
        onCheckedChange={onChange}
      />
      <label htmlFor="multiple-ticket-types" className="text-sm font-medium">
        Enable multiple ticket types
      </label>
    </div>
  );
};
