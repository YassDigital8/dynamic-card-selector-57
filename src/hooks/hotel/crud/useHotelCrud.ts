
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
  const demoMode = isInDemoMode();
  
  // Use react-query to fetch hotels, but bypass if in demo mode
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
    enabled: !demoMode, // Only fetch from API if not in demo mode
  });
  
  // Initialize with mock data in demo mode
  useEffect(() => {
    if (demoMode) {
      console.log('Using mock data due to demo mode');
      queryClient.setQueryData(['hotels'], defaultHotels);
    }
  }, [demoMode, queryClient]);
  
  // Fallback to mock data if API fails
  useEffect(() => {
    if (isError) {
      console.error('Error fetching hotels:', error);
      toast({
        title: "Warning",
        description: "Using mock data as fallback due to API error.",
        variant: "destructive",
      });
      queryClient.setQueryData(['hotels'], defaultHotels);
    }
  }, [isError, error, toast, queryClient]);
  
  // Add hotel mutation
  const addMutation = useMutation({
    mutationFn: demoMode 
      ? (hotelData: HotelFormData) => {
          // Simulate API call in demo mode
          return Promise.resolve({
            ...hotelData,
            id: `demo-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
          } as Hotel);
        }
      : createHotel,
    onSuccess: (data) => {
      console.log('Hotel added successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      
      if (demoMode) {
        // In demo mode, manually update the cache
        const existingHotels = queryClient.getQueryData<Hotel[]>(['hotels']) || [];
        queryClient.setQueryData(['hotels'], [...existingHotels, data]);
      }
      
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
  
  // Update hotel mutation
  const updateMutation = useMutation({
    mutationFn: demoMode
      ? ({ id, data }: { id: string; data: HotelFormData }) => {
          // Simulate API call in demo mode
          return Promise.resolve({
            ...data,
            id,
            updatedAt: new Date()
          } as Hotel);
        }
      : ({ id, data }: { id: string; data: HotelFormData }) => 
          updateHotelApi(id, data),
    onSuccess: (updatedHotel) => {
      if (demoMode) {
        // In demo mode, manually update the cache
        const existingHotels = queryClient.getQueryData<Hotel[]>(['hotels']) || [];
        const updatedHotels = existingHotels.map(hotel => 
          hotel.id === updatedHotel.id ? updatedHotel : hotel
        );
        queryClient.setQueryData(['hotels'], updatedHotels);
      } else {
        queryClient.invalidateQueries({ queryKey: ['hotels'] });
      }
      
      toast({
        title: "Success",
        description: "Hotel updated successfully",
      });
    }
  });
  
  // Delete hotel mutation
  const deleteMutation = useMutation({
    mutationFn: demoMode
      ? (id: string) => {
          // Simulate API call in demo mode
          return Promise.resolve(true);
        }
      : deleteHotelApi,
    onSuccess: (_, id) => {
      if (demoMode) {
        // In demo mode, manually update the cache
        const existingHotels = queryClient.getQueryData<Hotel[]>(['hotels']) || [];
        const filteredHotels = existingHotels.filter(hotel => hotel.id !== id);
        queryClient.setQueryData(['hotels'], filteredHotels);
      } else {
        queryClient.invalidateQueries({ queryKey: ['hotels'] });
      }
      
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
      console.log('API response from adding hotel:', result);
      
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
          error: 'Failed to add hotel - no result returned from API'
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

  // Combined loading state
  const isLoading = isQueryLoading || isLocalLoading || 
    addMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  // In demo mode or if there's an error, use mock data
  const activeHotels = demoMode || isError ? defaultHotels : hotels;

  return {
    hotels: activeHotels,
    allHotels: activeHotels, // Be consistent
    isLoading,
    addHotel,
    updateHotel,
    deleteHotel,
    refetchHotels: refetch
  };
};
