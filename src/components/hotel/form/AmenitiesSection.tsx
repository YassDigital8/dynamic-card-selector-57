
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './formSchema';
import AmenitiesStep from './amenities/AmenitiesStep';

interface AmenitiesSectionProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ form, hotelId }) => {
  return <AmenitiesStep form={form} hotelId={hotelId} />;
};

export default AmenitiesSection;
