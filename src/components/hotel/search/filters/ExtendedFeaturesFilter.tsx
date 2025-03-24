
import React from 'react';
import { FilterButton } from '../';
import { CreditCard } from 'lucide-react';
import CheckboxFilter from '../CheckboxFilter';
import { DEFAULT_PAYMENT_METHODS } from '../../form/payment/paymentMethodConstants';

interface ExtendedFeaturesFilterProps {
  extendedFeatures: {
    [key: string]: boolean;
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
        {DEFAULT_PAYMENT_METHODS.map(method => (
          <CheckboxFilter
            key={method.id}
            id={`${method.id}-filter`}
            label={method.name}
            checked={extendedFeatures[method.id.replace('-', '')] || false}
            onCheckedChange={(checked) => onFeatureChange(method.id.replace('-', ''), checked)}
          />
        ))}
      </div>
    </FilterButton>
  );
};

export default ExtendedFeaturesFilter;
