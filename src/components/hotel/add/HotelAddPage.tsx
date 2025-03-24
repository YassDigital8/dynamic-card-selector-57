
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HotelFormData } from '@/models/HotelModel';
import { useHotelNetwork } from '@/hooks/hotel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import HotelForm from '../HotelForm';
import HotelLoadingIndicator from '../HotelLoadingIndicator';
import ContentBackButton from '../layout/content/ContentBackButton';
import { Toaster } from '@/components/ui/toaster';

const HotelAddPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { addHotel, isLoading } = useHotelNetwork(selectedPOS);

  const handleSubmit = async (data: HotelFormData) => {
    setIsSubmitting(true);
    const hotelWithPOS = {
      ...data,
      posKey: selectedPOS === 'all' ? '' : selectedPOS
    };
    const result = addHotel(hotelWithPOS);
    setIsSubmitting(false);
    if (result && result.success && result.hotel) {
      toast({
        title: "Hotel Added",
        description: "Your hotel has been added successfully.",
        variant: "default"
      });

      // Navigate to the hotel details page
      navigate(`/hotel/edit/${result.hotel.id}`);
    } else {
      toast({
        title: "Error",
        description: "Failed to add hotel. Please try again.",
        variant: "destructive"
      });
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
      
      {/* Make sure we have a Toaster component to display notifications */}
      <Toaster />
    </div>
  );
};

export default HotelAddPage;
