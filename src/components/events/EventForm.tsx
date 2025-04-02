
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EventFormData, Event, EventType, EventImage } from '@/models/EventModel';
import { Save, X, Upload, Plus, Image, Trash2 } from 'lucide-react';
import { EventTypeIcon } from '@/components/events';
import { ImageUploadDialog } from '@/components/hotel/form/shared';
import { FileInfo } from '@/models/FileModel';

// Create a schema for form validation
const eventFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.string().min(3, { message: "Date is required" }),
  location: z.object({
    address: z.string().min(3, { message: "Address is required" }),
    city: z.string().min(2, { message: "City is required" }),
    country: z.string().min(2, { message: "Country is required" }),
  }),
  image: z.string().min(5, { message: "Image URL is required" }),
  images: z.array(z.object({
    url: z.string(),
    description: z.string().optional(),
    id: z.string().optional(),
    metadata: z.object({
      title: z.string().optional(),
      altText: z.string().optional(),
      caption: z.string().optional(),
    }).optional(),
  })).optional(),
  category: z.string().min(2, { message: "Category is required" }),
  eventType: z.string().optional(),
  rating: z.number().min(0).max(5),
  featured: z.boolean().optional(),
});

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [showImageUploadDialog, setShowImageUploadDialog] = useState(false);
  const [eventImages, setEventImages] = useState<EventImage[]>(
    initialData?.images || []
  );

  // Set up form with react-hook-form and zod validation
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData ? {
      ...initialData,
    } : {
      title: "",
      description: "",
      date: "",
      location: {
        address: "",
        city: "",
        country: "",
      },
      image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
      images: [],
      category: "",
      eventType: undefined,
      rating: 4.5,
      featured: false,
    }
  });

  const handleAddImage = (imageUrl: string, metadata?: any) => {
    const newImage: EventImage = {
      url: imageUrl,
      id: Date.now().toString(),
      description: metadata?.description || '',
      metadata: {
        title: metadata?.title || '',
        altText: metadata?.altText || '',
        caption: metadata?.caption || '',
      }
    };

    const updatedImages = [...eventImages, newImage];
    setEventImages(updatedImages);
    form.setValue('images', updatedImages);

    // Set the main image URL if this is the first image
    if (updatedImages.length === 1) {
      form.setValue('image', imageUrl);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...eventImages];
    updatedImages.splice(index, 1);
    setEventImages(updatedImages);
    form.setValue('images', updatedImages);

    // Update main image if needed
    if (updatedImages.length > 0 && form.getValues('image') === eventImages[index].url) {
      form.setValue('image', updatedImages[0].url);
    } else if (updatedImages.length === 0) {
      form.setValue('image', "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png");
    }
  };

  const handleSelectMultipleImages = (files: FileInfo[]) => {
    const newImages: EventImage[] = files.map(file => ({
      url: file.url,
      id: file.id,
      description: file.metadata?.description || '',
      metadata: {
        title: file.metadata?.title || '',
        altText: file.metadata?.altText || '',
        caption: file.metadata?.caption || '',
      }
    }));

    const updatedImages = [...eventImages, ...newImages];
    setEventImages(updatedImages);
    form.setValue('images', updatedImages);

    // Set the main image URL if this is the first image
    if (eventImages.length === 0 && newImages.length > 0) {
      form.setValue('image', newImages[0].url);
    }
  };

  const setMainImage = (url: string) => {
    form.setValue('image', url);
  };

  // Categories for the dropdown
  const categories = [
    "Shopping",
    "Cultural",
    "Attraction",
    "Adventure",
    "Food",
    "Music",
    "Sports",
    "Exhibition"
  ];

  // Event types from our model
  const eventTypes: EventType[] = [
    'Shows and Theatrical Plays',
    'Concerts',
    'Nightlife',
    'Comedy Events',
    'Festivals',
    'Arabic Events',
    'Sports Events',
    'Classical Events',
    'Business Events',
    'Instagrammable Places',
    'Eid Events',
    'Dining Experiences',
    'Exhibitions',
    'Art Events',
    'Ramadan',
    'Automotive',
    'Brunches',
    'Seminars',
    'Conferences',
    'Evening Tours',
    'New Year Events',
    'Night Tours',
    'Morning Tours',
    'Gaming & Esports',
    'Health and Wellness',
    'Maritime Heritage'
  ];

  const handleFormSubmit = (data: EventFormData) => {
    onSubmit({
      ...data,
      images: eventImages
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Event" : "Add New Event"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            {/* Event Images Section */}
            <div className="space-y-2">
              <FormLabel>Event Images</FormLabel>
              <div className="flex flex-wrap gap-4 mt-2">
                {eventImages.map((image, index) => (
                  <div 
                    key={image.id || index} 
                    className={`relative group overflow-hidden rounded-md border border-gray-200 bg-gray-50 ${form.getValues('image') === image.url ? 'ring-2 ring-primary' : ''}`}
                  >
                    <div className="relative w-24 h-24 md:w-28 md:h-28">
                      <img 
                        src={image.url} 
                        alt={image.metadata?.altText || `Event image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      {form.getValues('image') === image.url && (
                        <div className="absolute top-0 left-0 bg-primary/80 text-white text-xs px-2 py-1 rounded-br-md">
                          Main
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-1 transition-opacity">
                      {form.getValues('image') !== image.url && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="text-white h-8 w-8 p-0"
                          onClick={() => setMainImage(image.url)}
                        >
                          <Image className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-white h-8 w-8 p-0"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center border-dashed"
                  onClick={() => setShowImageUploadDialog(true)}
                >
                  <Plus className="h-5 w-5 mb-1" />
                  <span className="text-sm">Add Images</span>
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter event description" 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date/Schedule</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Jan 1 - Jan 30, 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px]">
                      {eventTypes.map(type => (
                        <SelectItem key={type} value={type} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <EventTypeIcon eventType={type as EventType} className="text-muted-foreground" />
                            <span>{type}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Event address/venue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (0-5)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="5" 
                      step="0.1" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Event"}
            </Button>
          </CardFooter>
        </form>
      </Form>

      <ImageUploadDialog
        isOpen={showImageUploadDialog}
        onClose={() => setShowImageUploadDialog(false)}
        onAddImage={handleAddImage}
        itemLabel="Event"
        multiSelect={true}
        onSelectMultiple={handleSelectMultipleImages}
      />
    </Card>
  );
};

export default EventForm;
