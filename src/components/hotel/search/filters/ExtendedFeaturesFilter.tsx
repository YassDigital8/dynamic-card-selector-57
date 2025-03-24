
import React from 'react';
import { FilterButton } from '../';
import { CreditCard } from 'lucide-react';
import CheckboxFilter from '../CheckboxFilter';

interface ExtendedFeaturesFilterProps {
  extendedFeatures: {
    bankTransfer: boolean;
  };
  onFeatureChange: (feature: string, value: boolean) => void;
  disabled?: boolean;
}

const ExtendedFeaturesFilter: React.FC<ExtendedFeaturesFilterProps> = ({
  extendedFeatures,
  onFeatureChange,
  disabled = false
}) => {
  const activeCount = Object.values(extendedFeatures).filter(Boolean).length;
  
  return (
    <FilterButton
      icon={<CreditCard className="h-4 w-4" />}
      label="Payment Options"
      activeValue={activeCount > 0 ? activeCount : null}
      badgeContent={activeCount}
      disabled={disabled}
    >
      <div className="flex flex-col gap-2 py-1">
        <CheckboxFilter
          id="bank-transfer-filter"
          label="Bank Transfer"
          checked={extendedFeatures.bankTransfer}
          onCheckedChange={(checked) => onFeatureChange('bankTransfer', checked)}
        />
      </div>
    </FilterButton>
  );
};

export default ExtendedFeaturesFilter;
