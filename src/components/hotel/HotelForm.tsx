
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  AirVent, 
  Utensils, 
  Coffee, 
  Wifi, 
  PawPrint, 
  MapPin,
  Flag,
  Building,
  Dumbbell,
  GlassWater,
  Hotel as HotelIcon,
  Bath,
  BedDouble,
  Waves
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HotelFormData, Hotel } from '@/models/HotelModel';

const formSchema = z.object({
  name: z.string().min(2, { message: "Hotel name must be at least 2 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  governorate: z.string().min(2, { message: "Governorate must be at least 2 characters." }),
  streetAddress: z.string().min(5, { message: "Street address must be at least 5 characters." }),
  posKey: z.string().default(''), // Added posKey to the form schema
  amenities: z.object({
    airConditioning: z.boolean().default(false),
    bar: z.boolean().default(false),
    gym: z.boolean().default(false),
    parking: z.boolean().default(false),
    spa: z.boolean().default(false),
    restaurant: z.boolean().default(false),
    breakfast: z.boolean().default(false),
    wifi: z.boolean().default(false),
    swimmingPool: z.boolean().default(false),
    petsAllowed: z.boolean().default(false),
    extraBed: z.boolean().default(false),
  }),
  roomTypes: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(2, { message: "Room type name must be at least 2 characters." }),
      maxAdults: z.number().min(1, { message: "At least 1 adult required." }),
      maxChildren: z.number().min(0),
      description: z.string().optional(),
      price: z.number().optional(),
    })
  ).default([]),
});

interface HotelFormProps {
  initialData?: Hotel;
  onSubmit: (data: HotelFormData) => void;
  isLoading: boolean;
}

export function HotelForm({ initialData, onSubmit, isLoading }: HotelFormProps) {
  const defaultValues: HotelFormData = {
    name: '',
    country: '',
    governorate: '',
    streetAddress: '',
    posKey: '', // Added posKey with default empty string
    amenities: {
      airConditioning: false,
      bar: false,
      gym: false,
      parking: false,
      spa: false,
      restaurant: false,
      breakfast: false,
      wifi: false,
      swimmingPool: false,
      petsAllowed: false,
      extraBed: false,
    },
    roomTypes: [{
      id: Date.now().toString(),
      name: '',
      maxAdults: 1,
      maxChildren: 0,
    }],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values as HotelFormData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6 col-span-2">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hotel name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Flag className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-8" placeholder="Enter country" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="governorate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Governorate/State</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-8" placeholder="Enter governorate or state" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-8" placeholder="Enter street address" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6 col-span-2">
            <h3 className="text-lg font-medium text-foreground">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="amenities.airConditioning"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <AirVent className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Air Conditioning</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.bar"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <GlassWater className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Bar</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.gym"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Gym</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.parking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <HotelIcon className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Parking</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.spa"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Spa</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.restaurant"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Restaurant</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.breakfast"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Breakfast</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.wifi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">WiFi</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.swimmingPool"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <Waves className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Swimming Pool</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.petsAllowed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <PawPrint className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Pets Allowed</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.extraBed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <BedDouble className="h-4 w-4 text-muted-foreground" />
                      <FormLabel className="m-0">Extra Bed</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6 col-span-2">
            <h3 className="text-lg font-medium text-foreground">Room Types</h3>
            {form.watch('roomTypes').map((_, index) => (
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
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Hotel"}
        </Button>
      </form>
    </Form>
  );
}

export default HotelForm;
