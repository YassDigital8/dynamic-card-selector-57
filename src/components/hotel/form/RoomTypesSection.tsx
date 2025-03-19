
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormValues } from './formSchema';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileInfo } from '@/models/FileModel';
import { FileGrid } from '@/components/gallery/file-list/FileGrid';
import { Image } from 'lucide-react';

interface RoomTypesSectionProps {
  form: UseFormReturn<FormValues>;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ form }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentRoomTypeIndex, setCurrentRoomTypeIndex] = useState(0);
  
  // Mock gallery files with correct FileInfo properties
  const galleryFiles: FileInfo[] = [
    {
      id: '1',
      url: '/lovable-uploads/07012bd6-4cd0-4959-bc2a-1caa5128aba0.png',
      name: 'Hotel Room',
      type: 'image/png',
      size: 10000,
      uploadedBy: 'admin',
      uploadedOn: '2023-06-15',
      galleryId: '1',
      metadata: {
        title: 'Deluxe Room',
        altText: 'Deluxe hotel room with king size bed',
        caption: 'Luxury accommodation',
        description: 'Spacious deluxe room with modern amenities'
      }
    },
    {
      id: '2',
      url: '/lovable-uploads/8d41fa29-3180-4df3-9844-3322321967de.png',
      name: 'Suite Room',
      type: 'image/png',
      size: 12000,
      uploadedBy: 'admin',
      uploadedOn: '2023-06-20',
      galleryId: '1',
      metadata: {
        title: 'Executive Suite',
        altText: 'Executive suite with living area',
        caption: 'Premium suite',
        description: 'Luxurious suite with separate living area'
      }
    }
  ];

  const handleSelectImage = (file: FileInfo) => {
    form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, file.url);
    setIsGalleryOpen(false);
  };

  const openGallery = (index: number) => {
    setCurrentRoomTypeIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="space-y-6 col-span-2">
      <h3 className="text-lg font-medium text-foreground">Room Types</h3>
      {form.watch('roomTypes').map((roomType, index) => (
        <div key={index} className="p-4 border rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Room Type {index + 1}</h4>
            {index > 0 && (
              <Button 
                variant="destructive" 
                size="sm" 
                type="button"
                onClick={() => {
                  const currentRoomTypes = form.getValues('roomTypes');
                  form.setValue('roomTypes', currentRoomTypes.filter((_, i) => i !== index));
                }}
              >
                Remove
              </Button>
            )}
          </div>
          
          {/* Room image preview */}
          <div className="mb-4">
            <FormLabel>Room Image</FormLabel>
            <div 
              className="mt-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center justify-center"
              onClick={() => openGallery(index)}
            >
              {form.watch(`roomTypes.${index}.imageUrl`) ? (
                <div className="space-y-2 w-full">
                  <img 
                    src={form.watch(`roomTypes.${index}.imageUrl`)} 
                    alt="Room preview" 
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <p className="text-center text-sm text-gray-500">Click to change image</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <Image className="h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Click to select a room image</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`roomTypes.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Deluxe Room" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`roomTypes.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Description of room" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`roomTypes.${index}.maxAdults`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Adults</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`roomTypes.${index}.maxChildren`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Children</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`roomTypes.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="0.00"
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          const currentRoomTypes = form.getValues('roomTypes');
          form.setValue('roomTypes', [
            ...currentRoomTypes,
            { name: '', maxAdults: 1, maxChildren: 0 }
          ]);
        }}
      >
        Add Room Type
      </Button>

      {/* Gallery Dialog */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Room Image</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh]">
            <FileGrid 
              files={galleryFiles}
              onViewFile={handleSelectImage}
              onShareFile={(file, e) => { e.preventDefault(); }}
              onDeleteFile={(file, e) => { e.preventDefault(); }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomTypesSection;
