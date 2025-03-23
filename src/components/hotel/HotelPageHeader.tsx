
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { FilterOptions } from '../hotel/HotelFilters';

interface HotelPageHeaderProps {
  title?: string;
  onAddHotel?: () => void;
  // Add the missing properties
  selectedPOS?: string;
  onSelectPOS?: (pos: string) => void;
  filters?: FilterOptions;
  onFilterChange?: (filters: FilterOptions) => void;
}

const HotelPageHeader: React.FC<HotelPageHeaderProps> = ({ 
  title = 'Hotel Network', 
  onAddHotel,
  selectedPOS,
  onSelectPOS,
  filters,
  onFilterChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white dark:bg-slate-950 p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{title}</h1>
      
      <div className="flex space-x-2">
        {onAddHotel ? (
          // Use callback if provided (for backwards compatibility)
          <Button 
            onClick={onAddHotel}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Add Hotel
          </Button>
        ) : (
          // Otherwise use Link to new add page
          <Link to="/hotel/add">
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle className="mr-1 h-4 w-4" />
              Add Hotel
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HotelPageHeader;
