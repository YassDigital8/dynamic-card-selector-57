
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { HotelFormData } from '@/models/HotelModel';
import { useHotelNetwork } from '@/hooks/hotel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import HotelForm from '../HotelForm';
import HotelLoadingIndicator from '../HotelLoadingIndicator';
import ContentBackButton from '../layout/content/ContentBackButton';

const HotelAddPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addHotel, isLoading } = useHotelNetwork(selectedPOS);

  const handleSubmit = async (data: HotelFormData) => {
    setIsSubmitting(true);
    try {
      const hotelWithPOS = {
        ...data,
        posKey: selectedPOS === 'all' ? '' : selectedPOS
      };
      
      console.log("Submitting hotel data:", JSON.stringify(hotelWithPOS, null, 2));
      
      const result = await addHotel(hotelWithPOS);
      
      console.log("Hotel add result:", result);
      
      if (result && result.success) {
        // Type guard to check if hotel property exists
        const hotelName = result.hotel ? result.hotel.name : 'Hotel';
        
        toast({
          title: "Hotel Added Successfully",
          description: `${hotelName} has been added to your hotel network`,
          variant: "default"
        });

        // Navigate to the hotel details page if we have a hotel id
        if (result.hotel) {
          navigate(`/hotel/edit/${result.hotel.id}`);
        } else {
          navigate('/hotel'); // Fallback to hotel list
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to add hotel. Please check the console for details.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting hotel:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/hotel');
  };

  const getSelectedPOSName = () => {
    if (!selectedPOS || selectedPOS === 'all') return undefined;
    return posOptions.find(p => p.key.toLowerCase() === selectedPOS.toLowerCase())?.englishName;
  };

  if (isLoading) {
    return <HotelLoadingIndicator message="Loading..." />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Back button */}
      <ContentBackButton onBackToList={handleCancel} />
      
      {/* Page header with title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Add New Hotel 
          {selectedPOS && selectedPOS !== 'all' && getSelectedPOSName() 
            ? ` (${getSelectedPOSName()})` 
            : ''}
        </h1>
      </div>

      {/* Main content card */}
      <Card className="p-6 border-indigo-100 dark:border-indigo-900 shadow-md">
        <HotelForm 
          onSubmit={handleSubmit} 
          isLoading={isSubmitting} 
          showButtons={true} 
        />
      </Card>
    </div>
  );
};

export default HotelAddPage;
