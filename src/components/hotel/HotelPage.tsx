
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import HotelList from './HotelList';
import HotelDetails from './HotelDetails';
import HotelForm from './HotelForm';
import useHotelNetwork from '@/hooks/useHotelNetwork';
import { Hotel, HotelFormData } from '@/models/HotelModel';

const HotelPage: React.FC = () => {
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
  } = useHotelNetwork();

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
    addHotel(data);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hotel Network</h1>
        <Button onClick={handleAddHotel} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Hotel
        </Button>
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
                  <h2 className="text-2xl font-bold mb-6">Add New Hotel</h2>
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
                    Select a hotel from the list to view its details, or add a new hotel to your network.
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
