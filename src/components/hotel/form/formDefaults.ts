
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
    shuttleBus: false,
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
  geolocation: undefined,
  paymentMethods: [],
  extraBedPolicy: {
    pricePerNight: 0,
    availableForRoomTypes: [],
    maxExtraBedsPerRoom: 1,
    notes: ''
  }
};

// Default bank account details for new hotel forms
export const defaultBankAccountDetails = {
  accountName: '',
  accountNumber: '',
  bankName: '',
  branchName: '',
  swiftCode: '',
  iban: '',
  additionalInfo: ''
};
