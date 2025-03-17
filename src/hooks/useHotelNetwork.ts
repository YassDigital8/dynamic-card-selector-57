
import { useState, useEffect } from 'react';
import { Hotel, HotelFormData, RoomType } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const defaultHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    country: 'United Arab Emirates',
    governorate: 'Dubai',
    streetAddress: '123 Sheikh Zayed Road',
    amenities: {
      airConditioning: true,
      bar: true,
      gym: true,
      parking: true,
      spa: true,
      restaurant: true,
      breakfast: true,
      wifi: true,
      swimmingPool: true,
      petsAllowed: false,
      extraBed: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Deluxe Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Spacious room with city view',
        price: 250
      },
      {
        id: '2',
        name: 'Executive Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Luxury suite with separate living area',
        price: 450
      }
    ],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-04-10')
  },
  {
    id: '2',
    name: 'Royal Garden Resort',
    country: 'Syria',
    governorate: 'Damascus',
    streetAddress: '45 Al-Mutanabbi Street',
    amenities: {
      airConditioning: true,
      bar: false,
      gym: true,
      parking: true,
      spa: true,
      restaurant: true,
      breakfast: true,
      wifi: true,
      swimmingPool: true,
      petsAllowed: false,
      extraBed: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Standard Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Comfortable room with garden view',
        price: 150
      },
      {
        id: '2',
        name: 'Family Suite',
        maxAdults: 4,
        maxChildren: 3,
        description: 'Perfect for families, with connecting rooms',
        price: 300
      }
    ],
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-05-22')
  }
];

export const useHotelNetwork = () => {
  const [hotels, setHotels] = useState<Hotel[]>(defaultHotels);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Function to add a new hotel
  const addHotel = (hotelData: HotelFormData) => {
    setIsLoading(true);
    try {
      const newHotel: Hotel = {
        ...hotelData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setHotels([...hotels, newHotel]);
      
      toast({
        title: "Success",
        description: `${newHotel.name} has been added to your hotel network`,
      });

      // Select the newly added hotel
      setSelectedHotel(newHotel);
      
      return true;
    } catch (error) {
      console.error('Error adding hotel:', error);
      
      toast({
        title: "Error",
        description: "Failed to add hotel. Please try again.",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update an existing hotel
  const updateHotel = (id: string, hotelData: Partial<HotelFormData>) => {
    setIsLoading(true);
    try {
      const updatedHotels = hotels.map(hotel => {
        if (hotel.id === id) {
          const updatedHotel = {
            ...hotel,
            ...hotelData,
            updatedAt: new Date()
          };
          
          // If we're updating the currently selected hotel, update that too
          if (selectedHotel && selectedHotel.id === id) {
            setSelectedHotel(updatedHotel);
          }
          
          return updatedHotel;
        }
        return hotel;
      });
      
      setHotels(updatedHotels);
      
      toast({
        title: "Success",
        description: "Hotel information updated successfully",
      });
      
      return true;
    } catch (error) {
      console.error('Error updating hotel:', error);
      
      toast({
        title: "Error",
        description: "Failed to update hotel. Please try again.",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  // Function to delete a hotel
  const deleteHotel = (id: string) => {
    setIsLoading(true);
    try {
      const hotelToDelete = hotels.find(hotel => hotel.id === id);
      
      if (!hotelToDelete) {
        throw new Error('Hotel not found');
      }
      
      const filteredHotels = hotels.filter(hotel => hotel.id !== id);
      setHotels(filteredHotels);
      
      // If we're deleting the currently selected hotel, clear the selection
      if (selectedHotel && selectedHotel.id === id) {
        setSelectedHotel(null);
      }
      
      toast({
        title: "Success",
        description: `${hotelToDelete.name} has been removed from your hotel network`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting hotel:', error);
      
      toast({
        title: "Error",
        description: "Failed to delete hotel. Please try again.",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a room type to a hotel
  const addRoomType = (hotelId: string, roomType: Omit<RoomType, 'id'>) => {
    const newRoomType: RoomType = {
      ...roomType,
      id: Date.now().toString()
    };
    
    return updateHotel(hotelId, {
      roomTypes: [...(hotels.find(h => h.id === hotelId)?.roomTypes || []), newRoomType]
    });
  };

  // Function to update a room type
  const updateRoomType = (hotelId: string, roomTypeId: string, updatedData: Partial<RoomType>) => {
    const hotel = hotels.find(h => h.id === hotelId);
    
    if (!hotel) return false;
    
    const updatedRoomTypes = hotel.roomTypes.map(rt => 
      rt.id === roomTypeId ? { ...rt, ...updatedData } : rt
    );
    
    return updateHotel(hotelId, { roomTypes: updatedRoomTypes });
  };

  // Function to delete a room type
  const deleteRoomType = (hotelId: string, roomTypeId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    
    if (!hotel) return false;
    
    const updatedRoomTypes = hotel.roomTypes.filter(rt => rt.id !== roomTypeId);
    
    return updateHotel(hotelId, { roomTypes: updatedRoomTypes });
  };

  return {
    hotels,
    selectedHotel,
    isLoading,
    isEditing,
    setSelectedHotel,
    setIsEditing,
    addHotel,
    updateHotel,
    deleteHotel,
    addRoomType,
    updateRoomType,
    deleteRoomType
  };
};

export default useHotelNetwork;
