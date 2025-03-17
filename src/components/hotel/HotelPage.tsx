
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import HotelList from './HotelList';
import useHotelNetwork from '@/hooks/hotel';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import HotelPageHeader from './HotelPageHeader';
import HotelEmptyState from './HotelEmptyState';
import HotelAddForm from './HotelAddForm';
import HotelEditForm from './HotelEditForm';
import HotelDetailsWrapper from './HotelDetailsWrapper';
import { FilterOptions } from './HotelFilters';

const HotelPage: React.FC = () => {
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  
  // Setup filter state
  const [filters, setFilters] = useState<FilterOptions>({
    amenities: {
      wifi: false,
      restaurant: false,
      gym: false,
      swimmingPool: false
    },
    showOnlyNewest: false,
    countryFilter: null
  });
  
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
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);

  // Apply filters to hotels
  useEffect(() => {
    let result = [...hotels];
    
    // Apply amenities filters
    if (Object.values(filters.amenities).some(Boolean)) {
      result = result.filter(hotel => {
        return (
          (!filters.amenities.wifi || hotel.amenities.wifi) &&
          (!filters.amenities.restaurant || hotel.amenities.restaurant) &&
          (!filters.amenities.gym || hotel.amenities.gym) &&
          (!filters.amenities.swimmingPool || hotel.amenities.swimmingPool)
        );
      });
    }
    
    // Apply newest filter
    if (filters.showOnlyNewest) {
      result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    // Apply country filter
    if (filters.countryFilter) {
      result = result.filter(hotel => hotel.country === filters.countryFilter);
    }
    
    setFilteredHotels(result);
  }, [hotels, filters]);

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
        filters={filters}
        onFilterChange={setFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-4 overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-sm">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <HotelList
                hotels={filteredHotels}
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
