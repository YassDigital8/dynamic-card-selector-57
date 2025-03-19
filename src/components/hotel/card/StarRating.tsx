
import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

interface StarRatingProps {
  rating: number; // Rating from 0-5
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = 'md', 
  className = '' 
}) => {
  // Ensure rating is between 0-5
  const safeRating = Math.max(0, Math.min(5, rating));
  
  // Convert rating to an array of 5 values representing full, half, or empty stars
  const stars = Array(5).fill(0).map((_, index) => {
    const position = index + 1;
    
    if (position <= Math.floor(safeRating)) {
      return 'full'; // Full star
    } else if (position - 0.5 <= safeRating) {
      return 'half'; // Half star
    } else {
      return 'empty'; // Empty star
    }
  });

  // Set icon size based on the size prop
  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20
  }[size];

  return (
    <div className={`flex items-center gap-[2px] ${className}`}>
      {stars.map((starType, index) => {
        const commonProps = {
          key: index,
          size: iconSize,
          className: 'text-yellow-400',
          strokeWidth: 1.5
        };
        
        if (starType === 'full') {
          return <Star fill="currentColor" {...commonProps} />;
        } else if (starType === 'half') {
          return <StarHalf fill="currentColor" {...commonProps} />;
        } else {
          return <StarOff {...commonProps} />;
        }
      })}
    </div>
  );
};

export default StarRating;
