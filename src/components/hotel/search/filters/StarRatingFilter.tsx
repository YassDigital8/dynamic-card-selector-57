
import React from 'react';
import { Star } from 'lucide-react';
import FilterButton from '../FilterButton';
import FilterGroup from '../FilterGroup';
import CheckboxFilter from '../CheckboxFilter';

interface StarRatingFilterProps {
  starRatings: number[];
  selectedStars: number | null;
  onStarChange: (stars: number | null) => void;
  disabled?: boolean;
}

const StarRatingFilter: React.FC<StarRatingFilterProps> = ({
  starRatings,
  selectedStars,
  onStarChange,
  disabled = false
}) => {
  return (
    <FilterButton 
      icon={<Star className="h-3.5 w-3.5 text-indigo-500" />}
      label="Stars"
      activeValue={selectedStars}
      badgeContent={selectedStars ? `${selectedStars}★` : undefined}
      disabled={disabled}
    >
      <FilterGroup title="Star Rating">
        {starRatings.map((rating) => (
          <CheckboxFilter
            key={rating}
            id={`star-${rating}`}
            label={
              <span className="flex items-center">
                {rating} {Array(rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400 inline ml-0.5" />
                ))}
              </span>
            }
            checked={selectedStars === rating}
            onCheckedChange={() => onStarChange(selectedStars === rating ? null : rating)}
          />
        ))}
      </FilterGroup>
    </FilterButton>
  );
};

export default StarRatingFilter;
