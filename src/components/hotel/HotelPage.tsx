
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusCircle, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import HotelList from './HotelList';
import HotelDetails from './HotelDetails';
import HotelForm from './HotelForm';
import useHotelNetwork from '@/hooks/useHotelNetwork';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';

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
      posKey: selectedPOS
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

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Hotel Network</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <Select
              value={selectedPOS}
              onValueChange={setSelectedPOS}
            >
              <SelectTrigger className="w-[200px] gap-2">
                <Flag className="h-4 w-4 text-green-500" />
                <SelectValue placeholder="Select POS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Regions</SelectItem>
                {posOptions.map(pos => (
                  <SelectItem key={pos.id} value={pos.key.toLowerCase()}>
                    {pos.englishName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddHotel} className="gap-2 w-full sm:w-auto">
            <PlusCircle className="h-4 w-4" />
            Add Hotel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-4">
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
              <motion.div
                key="add-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Add New Hotel {selectedPOS && `(${posOptions.find(p => p.key.toLowerCase() === selectedPOS.toLowerCase())?.englishName})`}</h2>
                  <HotelForm onSubmit={handleSubmitAdd} isLoading={isLoading} />
                </Card>
              </motion.div>
            )}

            {isEditing && selectedHotel && (
              <motion.div
                key="edit-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Edit Hotel</h2>
                  <HotelForm
                    initialData={selectedHotel}
                    onSubmit={handleSubmitEdit}
                    isLoading={isLoading}
                  />
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="mr-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {!showAddForm && !isEditing && selectedHotel && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <HotelDetails hotel={selectedHotel} onEdit={() => setIsEditing(true)} />
                </Card>
              </motion.div>
            )}

            {!showAddForm && !isEditing && !selectedHotel && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 flex flex-col items-center justify-center text-center h-[calc(100vh-320px)]">
                  <h2 className="text-2xl font-bold mb-4">Hotel Network Management</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    {selectedPOS ? 
                      hotels.length > 0 
                        ? `Select a hotel from the ${posOptions.find(p => p.key.toLowerCase() === selectedPOS.toLowerCase())?.englishName} region to view details.` 
                        : `No hotels found for ${posOptions.find(p => p.key.toLowerCase() === selectedPOS.toLowerCase())?.englishName}. Add your first hotel.`
                      : 'Select a POS region to view hotels, or add a new hotel to your network.'}
                  </p>
                  <Button onClick={handleAddHotel} className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Hotel
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
