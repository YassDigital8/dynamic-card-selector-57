
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AdminLayout from '@/components/layout/AdminLayout';
import { useHotelNetwork } from '@/hooks/hotel/useHotelNetwork';
import { HotelLoadingIndicator } from '@/components/hotel/HotelLoadingIndicator';
import { useToast } from '@/hooks/use-toast';

const HotelView = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getHotelById } = useHotelNetwork();
  
  const { data: hotel, isLoading, error } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => getHotelById(hotelId || ''),
    enabled: !!hotelId,
  });
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-6">
          <HotelLoadingIndicator />
        </div>
      </AdminLayout>
    );
  }
  
  if (error || !hotel) {
    toast({
      title: "Error",
      description: "Failed to load hotel details. Please try again.",
      variant: "destructive",
    });
    
    return (
      <AdminLayout>
        <div className="container mx-auto py-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                  Hotel not found
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  The hotel you're looking for doesn't exist or couldn't be loaded.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/hotel')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Hotels
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between bg-white dark:bg-slate-950 p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/hotel')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {hotel.name}
            </h1>
          </div>
          
          <Button 
            onClick={() => navigate(`/hotel/edit/${hotel.id}`)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Hotel
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <Card>
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold">Hotel Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                <p className="text-gray-800 dark:text-gray-200">
                  {hotel.streetAddress}, {hotel.governorate}, {hotel.country}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Star Rating</h3>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg 
                      key={index}
                      className={`w-5 h-5 ${index < hotel.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">POS Key</h3>
                <p className="text-gray-800 dark:text-gray-200">{hotel.posKey}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Amenities */}
          <Card>
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold">Amenities</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(hotel.amenities)
                  .filter(([key, value]) => typeof value === 'boolean' && value === true)
                  .map(([key]) => (
                    <div key={key} className="flex items-center p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                      <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</span>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
          
          {/* Room Types */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold">Room Types</h2>
            </CardHeader>
            <CardContent>
              {hotel.roomTypes && hotel.roomTypes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hotel.roomTypes.map((room) => (
                    <Card key={room.id} className="overflow-hidden">
                      {room.imageUrl && (
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={room.imageUrl} 
                            alt={room.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{room.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Max: {room.maxAdults} adults, {room.maxChildren} children
                        </p>
                        {room.price && (
                          <p className="mt-2 font-medium">Price: ${room.price}</p>
                        )}
                        {room.description && (
                          <p className="mt-2 text-sm">{room.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No room types available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HotelView;
