
// Original file content with our additions
import { FormValues } from './formSchema';

export const defaultValues: Partial<FormValues> = {
  name: '',
  country: '',
  governorate: '',
  streetAddress: '',
  posKey: '',
  rating: 3,
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
    barImages: [],
    gymImages: [],
    spaImages: [],
    restaurantImages: [],
    breakfastImages: [],
    swimmingPoolImages: [],
  },
  roomTypes: [],
  contactDetails: [],
  socialMedia: [],
  contractDocuments: [],
  newContractDescription: '',
};
