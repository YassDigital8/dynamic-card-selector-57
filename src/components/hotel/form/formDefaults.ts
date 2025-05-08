
import { HotelFormData } from '@/models/HotelModel';

// Default bank account details for bank transfer payment method
export const defaultBankAccountDetails = {
  accountName: '',
  accountNumber: '',
  bankName: '',
  branchName: '',
  swiftCode: '',
  iban: '',
  additionalInfo: ''
};

// Default values for the hotel form
export const defaultValues: HotelFormData = {
  name: '',
  country: '',
  governorate: '',
  streetAddress: '',
  posKey: '',
  rating: 0,
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
  },
  roomTypes: [], // Initialize with empty array
  contactDetails: [],
  socialMedia: [],
  contractDocuments: [],
  paymentMethods: [
    { id: 'cash', name: 'Cash', enabled: true },
    { id: 'credit', name: 'Credit Card', enabled: false },
    { id: 'bank', name: 'Bank Transfer', enabled: false },
    { id: 'online', name: 'Online Payment', enabled: false }
  ],
};
