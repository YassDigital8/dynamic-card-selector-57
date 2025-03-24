
import React from 'react';
import { Building } from 'lucide-react';
import FilterButton from '../FilterButton';
import FilterGroup from '../FilterGroup';
import CheckboxFilter from '../CheckboxFilter';

interface POSOption {
  id: number;
  key: string;
  arabicName: string;
  englishName: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string | null;
  modifiedBy: string | null;
}

interface POSFilterProps {
  posOptions: POSOption[];
  selectedPos: string | null;
  onPosChange: (pos: string | null) => void;
  disabled?: boolean;
}

const POSFilter: React.FC<POSFilterProps> = ({
  posOptions,
  selectedPos,
  onPosChange,
  disabled = false
}) => {
  return (
    <FilterButton 
      icon={<Building className="h-3.5 w-3.5 text-indigo-500" />}
      label="POS"
      activeValue={selectedPos}
      disabled={disabled}
    >
      <FilterGroup title="Point of Sale">
        <div className="max-h-40 overflow-y-auto">
          {posOptions.map((pos) => (
            <CheckboxFilter
              key={pos.key}
              id={`pos-${pos.key}`}
              label={pos.englishName}
              checked={selectedPos === pos.key}
              onCheckedChange={() => onPosChange(selectedPos === pos.key ? null : pos.key)}
            />
          ))}
        </div>
      </FilterGroup>
    </FilterButton>
  );
};

export default POSFilter;
