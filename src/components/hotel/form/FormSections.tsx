
import React from 'react';
import { BasicInformation, AmenitiesSection, RoomTypesSection } from './';
import { ContactDetailsSection } from './contact';
import { ContractDocumentSection } from './contract';
import { PaymentMethodsSection } from './payment';
import ExtendedFeaturesSection from './ExtendedFeaturesSection';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './formSchema';

interface FormSectionsProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

const FormSections: React.FC<FormSectionsProps> = ({ form, hotelId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BasicInformation form={form} />
      <AmenitiesSection form={form} hotelId={hotelId} />
      <RoomTypesSection form={form} />
      <ContactDetailsSection />
      <ExtendedFeaturesSection />
      <ContractDocumentSection />
    </div>
  );
};

export default FormSections;
