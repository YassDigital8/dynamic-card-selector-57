
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

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
  
  // Determine number of full and half stars
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Set icon size based on the size prop
  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20
  }[size];

  return (
    <div className={`flex items-center gap-[2px] ${className}`}>
      {/* Full stars */}
      {Array(fullStars).fill(0).map((_, i) => (
        <Star 
          key={`full-${i}`} 
          size={iconSize} 
          className="text-yellow-400 fill-current" 
          strokeWidth={1.5}
        />
      ))}
      
      {/* Half star if needed */}
      {hasHalfStar && (
        <StarHalf 
          key="half" 
          size={iconSize} 
          className="text-yellow-400 fill-current" 
          strokeWidth={1.5}
        />
      )}
      
      {/* Empty stars */}
      {Array(emptyStars).fill(0).map((_, i) => (
        <Star 
          key={`empty-${i}`} 
          size={iconSize} 
          className="text-gray-300 dark:text-gray-700" 
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export default StarRating;
