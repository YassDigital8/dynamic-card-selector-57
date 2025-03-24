
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import HotelResizablePanels from './layout/HotelResizablePanels';
import PageContentWrapper from './layout/PageContentWrapper';
import useHotelNetwork from '@/hooks/hotel/useHotelNetwork';
import useHotelFilters from '@/hooks/hotel/useHotelFilters';
import usePanelSizing from '@/hooks/hotel/usePanelSizing';
import { HotelFormData } from '@/models/HotelModel';
import HotelCommandSearch from './HotelCommandSearch';

interface RouteParams {
  pos?: string;
  [key: string]: string | undefined;
}

const HotelPageContainer = () => {
  const { pos } = useParams<RouteParams>();
  const [selectedPOS, setSelectedPOS] = useState(pos || 'all');
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [isSelectingNewHotel, setIsSelectingNewHotel] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    hotels: allHotels,
    hotels,
    selectedHotel,
    isLoading,
    isEditing,
    isInitialized,
    setSelectedHotel,
    setIsEditing,
    addHotel,
    updateHotel,
    deleteHotel,
    addRoomType,
    updateRoomType,
    deleteRoomType
  } = useHotelNetwork(selectedPOS);

  const useHotelFiltersResult = useHotelFilters(hotels);
  const { panelSize, setPanelSize } = usePanelSizing({
    selectedHotel,
    showAddForm,
    isEditing
  });

  useEffect(() => {
    if (pos) {
      setSelectedPOS(pos);
    }
  }, [pos]);

  useEffect(() => {
    if (selectedHotelId) {
      const hotel = hotels.find(h => h.id === selectedHotelId);
      if (hotel) {
        setSelectedHotel(hotel);
      }
    }
  }, [selectedHotelId, hotels, setSelectedHotel]);

  const handleSelectHotel = (hotel: any) => {
    setSelectedHotel(hotel);
    setIsSelectingNewHotel(false);
    navigate(`/hotel/${selectedPOS}/${hotel.id}`);
  };

  const handleAddHotel = () => {
    setShowAddForm(true);
    setIsSelectingNewHotel(true);
    navigate(`/hotel/${selectedPOS}/add`);
  };

  const handleEditHotel = (hotel: any) => {
    setIsEditing(true);
    navigate(`/hotel/edit/${hotel.id}`);
  };

  const handleDeleteHotel = (id: string) => {
    const result = deleteHotel(id);
    if (result.success) {
      toast({
        title: "Hotel Deleted",
        description: "The hotel has been successfully deleted.",
        variant: "destructive",
      });
      navigate(`/hotel/${selectedPOS}`);
    } else {
      toast({
        title: "Error Deleting Hotel",
        description: result.error || "Failed to delete the hotel.",
        variant: "destructive",
      });
    }
  };

  const onSubmitAdd = (data: HotelFormData) => {
    const result = addHotel(data);
    if (result.success && result.hotel) {
      setShowAddForm(false);
      setSelectedHotel(result.hotel);
      setIsSelectingNewHotel(false);
      toast({
        title: "Hotel Added",
        description: "The hotel has been successfully added.",
      });
      navigate(`/hotel/${selectedPOS}/${result.hotel.id}`);
    } else {
      toast({
        title: "Error Adding Hotel",
        description: result.error || "Failed to add the hotel.",
        variant: "destructive",
      });
    }
  };

  const onSubmitEdit = (data: HotelFormData) => {
    if (!selectedHotel) return;
    const result = updateHotel(selectedHotel.id, data);
    if (result.success && result.hotel) {
      setIsEditing(false);
      setSelectedHotel(result.hotel);
      toast({
        title: "Hotel Updated",
        description: "The hotel has been successfully updated.",
      });
      navigate(`/hotel/${selectedPOS}/${result.hotel.id}`);
    } else {
      toast({
        title: "Error Updating Hotel",
        description: result.error || "Failed to update the hotel.",
        variant: "destructive",
      });
    }
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    if (selectedHotel) {
      navigate(`/hotel/${selectedPOS}/${selectedHotel.id}`);
    } else {
      navigate(`/hotel/${selectedPOS}`);
    }
  };

  const onStartEdit = () => {
    setIsEditing(true);
    if (selectedHotel) {
      navigate(`/hotel/edit/${selectedHotel.id}`);
    }
  };

  const handleBackToList = () => {
    setShowAddForm(false);
    setIsEditing(false);
    setSelectedHotel(null);
    setIsSelectingNewHotel(false);
    navigate(`/hotel/${selectedPOS}`);
  };

  const posName = useMemo(() => {
    if (selectedPOS === 'all') return 'All POS';
    const foundHotel = allHotels.find(hotel => hotel.posKey === selectedPOS);
    return foundHotel ? foundHotel.posKey : undefined;
  }, [selectedPOS, allHotels]);

  const hasHotels = hotels && hotels.length > 0;

  return (
    <div>
      <HotelCommandSearch 
        hotels={useHotelFiltersResult.filteredHotels} 
        onSelectHotel={handleSelectHotel} 
      />
      <PageContentWrapper 
        selectedPOS={selectedPOS} 
        onSelectPOS={setSelectedPOS}
        onAddHotel={handleAddHotel}
        filters={useHotelFiltersResult.filters}
        onFilterChange={useHotelFiltersResult.setFilters}
      >
        <HotelResizablePanels
          panelSize={panelSize}
          setPanelSize={setPanelSize}
          filteredHotels={useHotelFiltersResult.filteredHotels}
          selectedHotel={selectedHotel}
          isSelectingNewHotel={isSelectingNewHotel}
          isLoading={isLoading}
          isEditing={isEditing}
          showAddForm={showAddForm}
          isExpanded={!selectedHotel && !showAddForm && !isEditing}
          selectedPOS={selectedPOS}
          posName={posName}
          hasHotels={hasHotels}
          onSelectHotel={handleSelectHotel}
          onEditHotel={handleEditHotel}
          onDeleteHotel={handleDeleteHotel}
          onAddHotel={handleAddHotel}
          onBackToList={handleBackToList}
          onSubmitAdd={onSubmitAdd}
          onSubmitEdit={onSubmitEdit}
          onCancelEdit={onCancelEdit}
          onStartEdit={onStartEdit}
        />
      </PageContentWrapper>
    </div>
  );
};

export default HotelPageContainer;
