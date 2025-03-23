
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HotelFormData } from '@/models/HotelModel';
import { useHotelNetwork } from '@/hooks/hotel';
import HotelLoadingIndicator from '../HotelLoadingIndicator';
import { HotelEditForm } from '../edit';

interface HotelEditPageProps {
  hotelId: string;
}

const HotelEditPage: React.FC<HotelEditPageProps> = ({ hotelId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    allHotels, 
    isLoading, 
    isInitialized,
    updateHotel, 
    deleteHotel 
  } = useHotelNetwork();
  
  const [currentHotel, setCurrentHotel] = useState(
    allHotels.find(hotel => hotel.id === hotelId) || null
  );

  // Update currentHotel when allHotels changes or initializes
  useEffect(() => {
    if (isInitialized && allHotels.length > 0) {
      const hotel = allHotels.find(h => h.id === hotelId);
      if (hotel) {
        setCurrentHotel(hotel);
      } else if (!isLoading) {
        // Hotel not found after loading
        toast({
          title: "Hotel Not Found",
          description: "The requested hotel could not be found.",
          variant: "destructive",
        });
        navigate('/hotel');
      }
    }
  }, [allHotels, hotelId, isInitialized, isLoading, navigate, toast]);

  const handleSubmit = async (data: HotelFormData) => {
    if (!currentHotel) return;
    
    setIsSubmitting(true);
    const result = updateHotel(currentHotel.id, data);
    setIsSubmitting(false);
    
    if (result && result.success) {
      toast({
        title: "Hotel Updated",
        description: "Your changes have been saved successfully.",
        variant: "default",
      });
      
      if (result.hotel) {
        setCurrentHotel(result.hotel);
      }
    } else {
      toast({
        title: "Error",
        description: "Failed to update hotel. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    if (!currentHotel) return;
    
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      const result = deleteHotel(currentHotel.id);
      
      if (result && result.success) {
        toast({
          title: "Hotel Deleted",
          description: "Hotel has been deleted successfully.",
          variant: "default",
        });
        navigate('/hotel');
      } else {
        toast({
          title: "Error",
          description: "Failed to delete hotel. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate('/hotel');
  };

  if (isLoading || !isInitialized) {
    return <HotelLoadingIndicator message="Loading hotel details..." />;
  }

  if (!currentHotel) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold mb-4">Hotel Not Found</h2>
        <p className="text-gray-500 mb-6">The hotel you're looking for doesn't exist or has been deleted.</p>
        <Button 
          variant="outline" 
          onClick={handleCancel}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Hotel List
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCancel}
            className="mr-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to List
          </Button>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Edit Hotel: {currentHotel.name}
          </h1>
        </div>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleDelete}
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Delete Hotel
        </Button>
      </div>

      <HotelEditForm 
        selectedHotel={currentHotel}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default HotelEditPage;
