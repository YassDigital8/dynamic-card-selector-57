
import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { fetchHotels, createHotel, updateHotel as updateHotelApi, deleteHotel as deleteHotelApi } from '@/services/api';
import { defaultHotels } from '../hotelMockData';
import { useToast } from '@/hooks/use-toast';

export const useHotelCrud = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  
  // Use react-query to fetch hotels
  const { 
    data: hotels = [], 
    isLoading: isQueryLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotels,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fallback to mock data if API fails
  useEffect(() => {
    if (isError) {
      console.error('Error fetching hotels:', error);
      toast({
        title: "Warning",
        description: "Using mock data as fallback due to API error.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);
  
  // Add hotel mutation
  const addMutation = useMutation({
    mutationFn: createHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      toast({
        title: "Success",
        description: "Hotel added successfully",
      });
    }
  });
  
  // Update hotel mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: HotelFormData }) => 
      updateHotelApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      toast({
        title: "Success",
        description: "Hotel updated successfully",
      });
    }
  });
  
  // Delete hotel mutation
  const deleteMutation = useMutation({
    mutationFn: deleteHotelApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      toast({
        title: "Success", 
        description: "Hotel deleted successfully",
      });
    }
  });
  
  // Add hotel handler
  const addHotel = useCallback((hotelData: HotelFormData) => {
    setIsLocalLoading(true);
    
    addMutation.mutate(hotelData, {
      onSettled: () => {
        setIsLocalLoading(false);
      }
    });
    
    // Return a placeholder response - the UI will update when the query refreshes
    return {
      success: true,
      hotel: {
        ...hotelData,
        id: 'temp-' + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      } as Hotel
    };
  }, [addMutation]);
  
  // Update hotel handler
  const updateHotel = useCallback((id: string, hotelData: HotelFormData) => {
    setIsLocalLoading(true);
    
    updateMutation.mutate({ id, data: hotelData }, {
      onSettled: () => {
        setIsLocalLoading(false);
      }
    });
    
    // Return a placeholder response - the UI will update when the query refreshes
    const existingHotel = hotels.find(h => h.id === id);
    if (!existingHotel) {
      return { success: false, error: 'Hotel not found' };
    }
    
    return {
      success: true,
      hotel: {
        ...existingHotel,
        ...hotelData,
        id,
        updatedAt: new Date()
      }
    };
  }, [hotels, updateMutation]);
  
  // Delete hotel handler
  const deleteHotel = useCallback((id: string) => {
    setIsLocalLoading(true);
    
    deleteMutation.mutate(id, {
      onSettled: () => {
        setIsLocalLoading(false);
      }
    });
    
    // Return a placeholder response - the UI will update when the query refreshes
    return { success: true };
  }, [deleteMutation]);

  // Combined loading state
  const isLoading = isQueryLoading || isLocalLoading || 
    addMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return {
    hotels: isError ? defaultHotels : hotels,
    isLoading,
    addHotel,
    updateHotel,
    deleteHotel,
    refetchHotels: refetch
  };
};
