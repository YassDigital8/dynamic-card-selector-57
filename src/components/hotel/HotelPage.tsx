
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import HotelList from './HotelList';
import useHotelNetwork from '@/hooks/hotel/useHotelNetwork';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import HotelPageHeader from './HotelPageHeader';
import HotelEmptyState from './HotelEmptyState';
import HotelAddForm from './HotelAddForm';
import HotelEditForm from './HotelEditForm';
import HotelDetailsWrapper from './HotelDetailsWrapper';

const HotelPage: React.FC = () => {
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  
  const {
    hotels,
    selectedHotel,
    isLoading,
    isEditing,
    setSelectedHotel,
    setIsEditing,
    addHotel,
    updateHotel,
    deleteHotel
  } = useHotelNetwork(selectedPOS);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(false);
    setShowAddForm(false);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(true);
    setShowAddForm(false);
  };

  const handleAddHotel = () => {
    setSelectedHotel(null);
    setIsEditing(false);
    setShowAddForm(true);
  };

  const handleSubmitAdd = (data: HotelFormData) => {
    // Include the selected POS in the new hotel data
    const hotelWithPOS = {
      ...data,
      posKey: selectedPOS === 'all' ? '' : selectedPOS
    };
    addHotel(hotelWithPOS);
    setShowAddForm(false);
  };

  const handleSubmitEdit = (data: HotelFormData) => {
    if (selectedHotel) {
      updateHotel(selectedHotel.id, data);
      setIsEditing(false);
    }
  };

  const getSelectedPOSName = () => {
    if (!selectedPOS || selectedPOS === 'all') return undefined;
    return posOptions.find(p => p.key.toLowerCase() === selectedPOS.toLowerCase())?.englishName;
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <HotelPageHeader 
        selectedPOS={selectedPOS}
        onSelectPOS={setSelectedPOS}
        onAddHotel={handleAddHotel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-4 overflow-hidden border-blue-100 dark:border-blue-900">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <HotelList
                hotels={hotels}
                selectedHotel={selectedHotel}
                onSelectHotel={handleSelectHotel}
                onEditHotel={handleEditHotel}
                onDeleteHotel={deleteHotel}
              />
            </ScrollArea>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {showAddForm && (
              <HotelAddForm
                isLoading={isLoading}
                onSubmit={handleSubmitAdd}
                selectedPOS={selectedPOS}
                posName={getSelectedPOSName()}
              />
            )}

            {isEditing && selectedHotel && (
              <HotelEditForm
                selectedHotel={selectedHotel}
                isLoading={isLoading}
                onSubmit={handleSubmitEdit}
                onCancel={() => setIsEditing(false)}
              />
            )}

            {!showAddForm && !isEditing && selectedHotel && (
              <HotelDetailsWrapper 
                hotel={selectedHotel} 
                onEdit={() => setIsEditing(true)} 
              />
            )}

            {!showAddForm && !isEditing && !selectedHotel && (
              <HotelEmptyState
                selectedPOS={selectedPOS}
                posName={getSelectedPOSName()}
                hasHotels={hotels.length > 0}
                onAddHotel={handleAddHotel}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
