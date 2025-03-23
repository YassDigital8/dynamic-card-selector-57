
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { Hotel } from '@/models/HotelModel';

interface HotelViewHeaderProps {
  hotel: Hotel;
}

const HotelViewHeader: React.FC<HotelViewHeaderProps> = ({ hotel }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-950 p-4 rounded-lg shadow">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/hotel')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          {hotel.name}
        </h1>
      </div>
      
      <Button 
        onClick={() => navigate(`/hotel/edit/${hotel.id}`)}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        <Edit className="mr-2 h-4 w-4" />
        Edit Hotel
      </Button>
    </div>
  );
};

export default HotelViewHeader;
