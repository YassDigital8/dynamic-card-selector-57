
import React from 'react';
import { FilterButton } from '../';
import { Puzzle } from 'lucide-react';
import CheckboxFilter from '../CheckboxFilter';

interface ExtendedFeaturesFilterProps {
  extendedFeatures: {
    extraBed: boolean;
    bankTransfer: boolean;
    hasGeolocation: boolean;
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
      icon={<Puzzle className="h-4 w-4" />}
      label="Extended"
      activeValue={activeCount > 0 ? activeCount : null}
      badgeContent={activeCount}
      disabled={disabled}
    >
      <div className="flex flex-col gap-2 py-1">
        <CheckboxFilter
          id="extra-bed-filter"
          label="Extra Bed Available"
          checked={extendedFeatures.extraBed}
          onCheckedChange={(checked) => onFeatureChange('extraBed', checked)}
        />
        <CheckboxFilter
          id="bank-transfer-filter"
          label="Bank Transfer"
          checked={extendedFeatures.bankTransfer}
          onCheckedChange={(checked) => onFeatureChange('bankTransfer', checked)}
        />
        <CheckboxFilter
          id="geolocation-filter"
          label="Has Geolocation"
          checked={extendedFeatures.hasGeolocation}
          onCheckedChange={(checked) => onFeatureChange('hasGeolocation', checked)}
        />
      </div>
    </FilterButton>
  );
};

export default ExtendedFeaturesFilter;
