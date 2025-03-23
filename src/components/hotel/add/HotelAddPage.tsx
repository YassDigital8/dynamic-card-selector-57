
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
        variant: "default",
      });
      
      // Navigate to the hotel details page
      navigate(`/hotel/edit/${result.hotel.id}`);
    } else {
      toast({
        title: "Error",
        description: "Failed to add hotel. Please try again.",
        variant: "destructive",
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
            Add New Hotel 
            {selectedPOS && selectedPOS !== 'all' && getSelectedPOSName() ? 
              ` (${getSelectedPOSName()})` : ''}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm"
            value={selectedPOS}
            onChange={(e) => setSelectedPOS(e.target.value)}
          >
            <option value="">Select POS</option>
            <option value="all">All POS</option>
            {posOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.englishName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card className="p-6 border-blue-100 dark:border-blue-900 shadow-lg">
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
