import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AdminLayout from '@/components/layout/AdminLayout';
import HotelLoadingIndicator from '@/components/hotel/HotelLoadingIndicator';
import { useToast } from '@/hooks/use-toast';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { FilePreview } from '@/components/gallery/FilePreview';
import { AmenityListItemType } from '@/components/hotel/form/amenities/types';
import { amenitiesList } from '@/components/hotel/form/amenities/constants';
import { cn } from '@/lib/utils';
import { FileInfo } from '@/models/FileModel';
import { useHotelNetwork } from '@/hooks/hotel/useHotelNetwork';

const HotelView = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { allHotels } = useHotelNetwork();
  
  const { data: hotel, isLoading } = useQuery({
    queryKey: ['hotel', hotelId, allHotels],
    queryFn: () => {
      const foundHotel = allHotels.find(hotel => hotel.id === hotelId);
      if (!foundHotel) {
        throw new Error('Hotel not found');
      }
      return foundHotel;
    },
    enabled: !!hotelId && !!allHotels.length,
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
  
  if (!hotel) {
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

  const renderAmenityImages = (amenityKey: string) => {
    const imagesKey = `${amenityKey}Images` as keyof typeof hotel.amenities;
    const images = hotel.amenities[imagesKey] as any[] || [];
    
    if (!images || images.length === 0) return null;
    
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="aspect-square overflow-hidden rounded-md">
                  <img
                    src={image.url}
                    alt={image.description || `Amenity image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  };

  const renderContractDocuments = () => {
    if (!hotel.contractDocuments || hotel.contractDocuments.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400">No contract documents available.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotel.contractDocuments.map((doc) => (
          <Card key={doc.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0">
                  <FilePreview file={{
                    id: doc.id,
                    name: doc.fileName,
                    type: 'application/pdf',
                    size: 0,
                    url: doc.url,
                    uploadedBy: 'system',
                    uploadedOn: doc.createdAt || new Date().toISOString(),
                    galleryId: 'contractDocuments',
                    metadata: {
                      description: doc.description
                    }
                  }} size="sm" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{doc.fileName}</h4>
                  {doc.description && <p className="text-xs text-gray-500">{doc.description}</p>}
                  {doc.startDate && doc.endDate && (
                    <p className="text-xs text-gray-500">
                      Valid: {new Date(doc.startDate).toLocaleDateString()} - {new Date(doc.endDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Download Document
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
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
        
        <Accordion type="single" collapsible className="w-full">
          {/* Step 1: Basic Information */}
          <AccordionItem value="basic-info" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-sm">1</span>
                Basic Information
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 shadow-none mb-4">
                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hotel Name</h3>
                      <p className="text-gray-800 dark:text-gray-200">{hotel.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">POS Key</h3>
                      <p className="text-gray-800 dark:text-gray-200">{hotel.posKey}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</h3>
                      <p className="text-gray-800 dark:text-gray-200">{hotel.country}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Governorate</h3>
                      <p className="text-gray-800 dark:text-gray-200">{hotel.governorate}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Street Address</h3>
                      <p className="text-gray-800 dark:text-gray-200">{hotel.streetAddress}</p>
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
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Step 2: Amenities */}
          <AccordionItem value="amenities" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-sm">2</span>
                Amenities
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 shadow-none mb-4">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amenitiesList.map((amenity: AmenityListItemType) => {
                      const amenityKey = amenity.name.split('.')[1] as keyof typeof hotel.amenities;
                      const hasAmenity = hotel.amenities[amenityKey];
                      const hasImages = amenity.hasImages && hasAmenity;
                      
                      if (!hasAmenity) return null;
                      
                      return (
                        <Card key={amenity.name} className={cn(
                          "overflow-hidden",
                          hasAmenity ? "bg-indigo-50 dark:bg-indigo-900/20" : "opacity-50"
                        )}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <amenity.icon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                              <h3 className="font-medium">{amenity.label}</h3>
                            </div>
                          </CardHeader>
                          {hasImages && (
                            <CardContent>
                              {renderAmenityImages(amenityKey)}
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Step 3: Room Types */}
          <AccordionItem value="room-types" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-sm">3</span>
                Room Types
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 shadow-none mb-4">
                <CardContent className="pt-4">
                  {hotel.roomTypes && hotel.roomTypes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {hotel.roomTypes.map((room) => (
                        <Card key={room.id} className="overflow-hidden">
                          {(room.imageUrl || (room.images && room.images.length > 0)) && (
                            <div className="h-40 overflow-hidden">
                              {room.images && room.images.length > 0 ? (
                                <Carousel>
                                  <CarouselContent>
                                    {room.images.map((image, idx) => (
                                      <CarouselItem key={idx}>
                                        <img 
                                          src={image} 
                                          alt={`${room.name} image ${idx + 1}`} 
                                          className="w-full h-40 object-cover"
                                        />
                                      </CarouselItem>
                                    ))}
                                  </CarouselContent>
                                  {room.images.length > 1 && (
                                    <>
                                      <CarouselPrevious />
                                      <CarouselNext />
                                    </>
                                  )}
                                </Carousel>
                              ) : (
                                <img 
                                  src={room.imageUrl} 
                                  alt={room.name} 
                                  className="w-full h-full object-cover"
                                />
                              )}
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
                            {room.seasonalPrices && room.seasonalPrices.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-sm font-medium">Seasonal Prices:</h4>
                                <ul className="text-xs space-y-1 mt-1">
                                  {room.seasonalPrices.map((season) => (
                                    <li key={season.id} className="flex justify-between">
                                      <span>{season.seasonName}</span>
                                      <span className="font-medium">${season.price}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
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
            </AccordionContent>
          </AccordionItem>

          {/* Step 4: Contact & Social Media */}
          <AccordionItem value="contact" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-4 text-sm">4</span>
                Contact & Social Media
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 shadow-none mb-4">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Details */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Contact Details</h3>
                      {hotel.contactDetails && hotel.contactDetails.length > 0 ? (
                        <div className="space-y-3">
                          {hotel.contactDetails.map((contact) => (
                            <div key={contact.id} className="p-3 border rounded-md">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium capitalize">{contact.type}</span>
                                {contact.isPrimary && (
                                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <p className="text-lg font-medium">{contact.value}</p>
                              {contact.personName && (
                                <p className="text-sm text-gray-500">
                                  {contact.personName}
                                  {contact.personRole && ` - ${contact.personRole}`}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No contact details available.</p>
                      )}
                    </div>

                    {/* Social Media */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Social Media</h3>
                      {hotel.socialMedia && hotel.socialMedia.length > 0 ? (
                        <div className="space-y-3">
                          {hotel.socialMedia.map((social) => (
                            <div key={social.id} className="p-3 border rounded-md">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium capitalize">{social.platform}</span>
                                <a 
                                  href={social.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:underline"
                                >
                                  Open Link
                                </a>
                              </div>
                              <p className="text-sm text-gray-500 truncate">{social.url}</p>
                              {social.label && (
                                <p className="text-xs mt-1">{social.label}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No social media links available.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Step 5: Extended Features */}
          <AccordionItem value="extended-features" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-4 text-sm">5</span>
                Extended Features
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 shadow-none mb-4">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Geolocation */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Geolocation</h3>
                      {hotel.geolocation ? (
                        <div className="p-3 border rounded-md">
                          <div className="flex flex-col space-y-2">
                            <div>
                              <span className="text-sm font-medium">Coordinates:</span>
                              <p className="text-gray-800">
                                {hotel.geolocation.lat}, {hotel.geolocation.lng}
                              </p>
                            </div>
                            {hotel.geolocation.formattedAddress && (
                              <div>
                                <span className="text-sm font-medium">Address:</span>
                                <p className="text-gray-800">{hotel.geolocation.formattedAddress}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No geolocation information available.</p>
                      )}
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                      {hotel.paymentMethods && hotel.paymentMethods.length > 0 ? (
                        <div className="space-y-3">
                          {hotel.paymentMethods
                            .filter(method => method.enabled)
                            .map((method) => (
                              <div key={method.id} className="p-3 border rounded-md">
                                <h4 className="font-medium">{method.name}</h4>
                                {method.bankAccountDetails && (
                                  <div className="mt-2 text-sm">
                                    <p><span className="font-medium">Account Name:</span> {method.bankAccountDetails.accountName}</p>
                                    <p><span className="font-medium">Account Number:</span> {method.bankAccountDetails.accountNumber}</p>
                                    <p><span className="font-medium">Bank:</span> {method.bankAccountDetails.bankName}</p>
                                    {method.bankAccountDetails.iban && (
                                      <p><span className="font-medium">IBAN:</span> {method.bankAccountDetails.iban}</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No payment methods available.</p>
                      )}
                    </div>

                    {/* Extra Bed Policy */}
                    {hotel.extraBedPolicy && (
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium mb-4">Extra Bed Policy</h3>
                        <div className="p-3 border rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-medium">Price per Night:</span>
                              <p className="text-gray-800">${hotel.extraBedPolicy.pricePerNight}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Max Extra Beds per Room:</span>
                              <p className="text-gray-800">{hotel.extraBedPolicy.maxExtraBedsPerRoom}</p>
                            </div>
                            {hotel.extraBedPolicy.notes && (
                              <div className="md:col-span-2">
                                <span className="text-sm font-medium">Notes:</span>
                                <p className="text-gray-800">{hotel.extraBedPolicy.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Step 6: Contract & Commercial */}
          <AccordionItem value="contract-commercial" className="border-b border-gray-200 dark:border-gray-800">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-4 text-sm">6</span>
                Contract & Commercial
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 shadow-none mb-4">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-medium mb-4">Contract Documents</h3>
                  {renderContractDocuments()}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </AdminLayout>
  );
};

export default HotelView;
