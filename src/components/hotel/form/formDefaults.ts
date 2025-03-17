
import { HotelFormData } from '@/models/HotelModel';

export const defaultValues: HotelFormData = {
  name: '',
  country: '',
  governorate: '',
  streetAddress: '',
  posKey: '',
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
