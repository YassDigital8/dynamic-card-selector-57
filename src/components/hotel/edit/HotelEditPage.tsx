
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useHotelNetwork } from '@/hooks/hotel/network';
import HotelLoadingIndicator from '../HotelLoadingIndicator';
import { HotelEditForm } from '../edit';
import DeleteHotelDialog from '../DeleteHotelDialog';

interface HotelEditPageProps {
  hotelId: string;
}

const HotelEditPage: React.FC<HotelEditPageProps> = ({ hotelId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { 
    allHotels, 
    isLoading, 
    isInitialized,
    updateHotel, 
    deleteHotel 
  } = useHotelNetwork();
  
  const [currentHotel, setCurrentHotel] = useState<Hotel | null>(
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
    try {
      const result = await updateHotel(currentHotel.id, data);
      
      if (result && result.success) {
        toast({
          title: "Hotel Updated",
          description: "Your changes have been saved successfully.",
          variant: "default",
        });
        
        // Only update current hotel if we have a hotel property in the result
        if ('hotel' in result && result.hotel) {
          setCurrentHotel(result.hotel);
        }
      } else {
        toast({
          title: "Error",
          description: result?.error || "Failed to update hotel. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!currentHotel) return;
    
    try {
      const result = await deleteHotel(currentHotel.id);
      
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
          description: result?.error || "Failed to delete hotel. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
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
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCancel}
            className="mr-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to List
          </Button>
          <div className="flex items-center">
            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Edit Hotel: {currentHotel.name}
            </h1>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleOpenDeleteDialog}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Delete Hotel
        </Button>
      </motion.div>

      <HotelEditForm 
        selectedHotel={currentHotel}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={handleOpenDeleteDialog}
      />
      
      <DeleteHotelDialog
        hotel={currentHotel}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default HotelEditPage;
