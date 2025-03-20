
import React, { useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import HotelListPanel from './HotelListPanel';
import HotelContentPanel from './HotelContentPanel';
import { Hotel, HotelFormData } from '@/models/HotelModel';

interface HotelResizablePanelsProps {
  panelSize: number;
  setPanelSize: (size: number) => void;
  filteredHotels: Hotel[];
  selectedHotel: Hotel | null;
  isSelectingNewHotel: boolean;
  isLoading: boolean;
  isEditing: boolean;
  showAddForm: boolean;
  isExpanded: boolean;
  selectedPOS: string;
  posName?: string;
  hasHotels: boolean;
  onSelectHotel: (hotel: Hotel) => void;
  onEditHotel: (hotel: Hotel) => void;
  onDeleteHotel: (id: string) => void;
  onAddHotel: () => void;
  onBackToList: () => void;
  onSubmitAdd: (data: HotelFormData) => void;
  onSubmitEdit: (data: HotelFormData) => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
}

const HotelResizablePanels: React.FC<HotelResizablePanelsProps> = ({
  panelSize,
  setPanelSize,
  filteredHotels,
  selectedHotel,
  isSelectingNewHotel,
  isLoading,
  isEditing,
  showAddForm,
  isExpanded,
  selectedPOS,
  posName,
  hasHotels,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel,
  onAddHotel,
  onBackToList,
  onSubmitAdd,
  onSubmitEdit,
  onCancelEdit,
  onStartEdit
}) => {
  // Force panel resize when selection changes
  useEffect(() => {
    const panelResizeEvent = new Event('panelresize');
    window.dispatchEvent(panelResizeEvent);
  }, [selectedHotel, showAddForm, isEditing]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] rounded-lg border border-indigo-100 dark:border-indigo-900 bg-white dark:bg-slate-900 shadow-lg"
      onLayout={(sizes) => {
        // This will run when the panels are resized by the user
        if (sizes.length > 0) {
          setPanelSize(sizes[0]);
        }
      }}
    >
      <ResizablePanel 
        defaultSize={panelSize}
        minSize={35}
        maxSize={65}
        className="transition-all duration-300"
        // Force the panel to use the current panelSize value
        size={panelSize}
      >
        <HotelListPanel 
          filteredHotels={filteredHotels}
          selectedHotel={selectedHotel}
          isExpanded={!isExpanded}
          onSelectHotel={onSelectHotel}
          onEditHotel={onEditHotel}
          onDeleteHotel={onDeleteHotel}
          panelSize={panelSize}
          isEditing={isEditing || showAddForm}
        />
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800" />
      
      <ResizablePanel 
        defaultSize={100 - panelSize}
        minSize={35}
        maxSize={65}
        className="transition-all duration-300"
        // Force the panel to use the complement of panelSize
        size={100 - panelSize}
      >
        <HotelContentPanel 
          selectedHotel={isSelectingNewHotel ? null : selectedHotel}
          isLoading={isLoading}
          isEditing={isEditing}
          showAddForm={showAddForm}
          isExpanded={isExpanded}
          selectedPOS={selectedPOS}
          posName={posName}
          hasHotels={hasHotels}
          onAddHotel={onAddHotel}
          onBackToList={onBackToList}
          onSubmitAdd={onSubmitAdd}
          onSubmitEdit={onSubmitEdit}
          onCancelEdit={onCancelEdit}
          onStartEdit={onStartEdit}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default HotelResizablePanels;
