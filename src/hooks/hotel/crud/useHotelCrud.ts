import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { fetchHotels, createHotel, updateHotel as updateHotelApi, deleteHotel as deleteHotelApi } from '@/services/api';
import { defaultHotels } from '../mockData';
import { useToast } from '@/hooks/use-toast';
import { isInDemoMode } from '@/services/authService';

export const useHotelCrud = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  
  // Initialize with mock data immediately
  useEffect(() => {
    console.log('Using mock data - API disabled');
    queryClient.setQueryData(['hotels'], defaultHotels);
  }, [queryClient]);
  
  // Add hotel mutation (demo mode)
  const addMutation = useMutation({
    mutationFn: (hotelData: HotelFormData) => {
      // Simulate API call in demo mode
      return Promise.resolve({
        ...hotelData,
        id: `demo-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Hotel);
    },
    onSuccess: (data) => {
      console.log('Hotel added successfully:', data);
      
      // In demo mode, manually update the cache
      const existingHotels = queryClient.getQueryData<Hotel[]>(['hotels']) || [];
      queryClient.setQueryData(['hotels'], [...existingHotels, data]);
      
      toast({
        title: "Success",
        description: "Hotel added successfully",
      });
    },
    onError: (error) => {
      console.error('Error in addMutation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add hotel",
        variant: "destructive",
      });
    }
  });
  
  // Update hotel mutation (demo mode)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: HotelFormData }) => {
      // Simulate API call in demo mode
      return Promise.resolve({
        ...data,
        id,
        updatedAt: new Date()
      } as Hotel);
    },
    onSuccess: (updatedHotel) => {
      // In demo mode, manually update the cache
      const existingHotels = queryClient.getQueryData<Hotel[]>(['hotels']) || [];
      const updatedHotels = existingHotels.map(hotel => 
        hotel.id === updatedHotel.id ? updatedHotel : hotel
      );
      queryClient.setQueryData(['hotels'], updatedHotels);
      
      toast({
        title: "Success",
        description: "Hotel updated successfully",
      });
    }
  });
  
  // Delete hotel mutation (demo mode)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      // Simulate API call in demo mode
      return Promise.resolve(true);
    },
    onSuccess: (_, id) => {
      // In demo mode, manually update the cache
      const existingHotels = queryClient.getQueryData<Hotel[]>(['hotels']) || [];
      const filteredHotels = existingHotels.filter(hotel => hotel.id !== id);
      queryClient.setQueryData(['hotels'], filteredHotels);
      
      toast({
        title: "Success", 
        description: "Hotel deleted successfully",
      });
    }
  });
  
  // Add hotel handler
  const addHotel = useCallback(async (hotelData: HotelFormData) => {
    setIsLocalLoading(true);
    
    console.log('Adding hotel with data:', hotelData);
    
    try {
      const result = await addMutation.mutateAsync(hotelData);
      console.log('Demo mode: Added hotel successfully:', result);
      
      setIsLocalLoading(false);
      
      if (result) {
        return {
          success: true,
          hotel: result
        };
      } else {
        return { 
          success: false, 
          error: 'Failed to add hotel - no result returned'
        };
      }
    } catch (error) {
      console.error('Error in addHotel:', error);
      setIsLocalLoading(false);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }, [addMutation]);
  
  // Update hotel handler
  const updateHotel = useCallback(async (id: string, hotelData: HotelFormData) => {
    setIsLocalLoading(true);
    
    try {
      const result = await updateMutation.mutateAsync({ id, data: hotelData });
      setIsLocalLoading(false);
      
      // Ensure we always return an object with success property
      // and hotel property if successful
      if (result) {
        return {
          success: true,
          hotel: result
        };
      } else {
        return { 
          success: false, 
          error: 'Hotel not found or update failed' 
        };
      }
    } catch (error) {
      console.error('Error in updateHotel:', error);
      setIsLocalLoading(false);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }, [updateMutation]);
  
  // Delete hotel handler
  const deleteHotel = useCallback(async (id: string) => {
    setIsLocalLoading(true);
    
    try {
      const result = await deleteMutation.mutateAsync(id);
      setIsLocalLoading(false);
      return { success: result, result };
    } catch (error) {
      console.error('Error in deleteHotel:', error);
      setIsLocalLoading(false);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }, [deleteMutation]);

  // Combined loading state - always set to false after initial load
  const isLoading = isLocalLoading || 
    addMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return {
    hotels: defaultHotels,
    allHotels: defaultHotels,
    isLoading,
    addHotel,
    updateHotel,
    deleteHotel,
    refetchHotels: () => Promise.resolve(defaultHotels)
  };
};
