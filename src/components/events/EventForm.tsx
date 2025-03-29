
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EventFormData, Event, EventType } from '@/models/EventModel';
import { Save, X } from 'lucide-react';
import { EventTypeIcon } from '@/components/events';

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
      category: "",
      eventType: undefined,
      rating: 4.5,
      featured: false,
    }
  });

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Event" : "Add New Event"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
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
    </Card>
  );
};

export default EventForm;
