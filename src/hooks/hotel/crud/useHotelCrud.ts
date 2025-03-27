
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
    onSuccess: (data) => {
      console.log('Hotel added successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
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

  return {
    hotels: isError ? defaultHotels : hotels,
    allHotels: isError ? defaultHotels : hotels, // Added for consistency
    isLoading,
    addHotel,
    updateHotel,
    deleteHotel,
    refetchHotels: refetch
  };
};
