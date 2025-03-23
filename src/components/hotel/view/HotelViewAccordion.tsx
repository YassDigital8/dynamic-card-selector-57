
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel } from '@/models/HotelModel';
import BasicInfoSection from './sections/BasicInfoSection';
import AmenitiesSection from './sections/AmenitiesSection';
import RoomTypesSection from './sections/RoomTypesSection';
import ContactSection from './sections/ContactSection';
import ExtendedFeaturesSection from './sections/ExtendedFeaturesSection';
import ContractSection from './sections/ContractSection';

interface HotelViewAccordionProps {
  hotel: Hotel;
}

const HotelViewAccordion: React.FC<HotelViewAccordionProps> = ({ hotel }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Step 1: Basic Information */}
      <AccordionItem value="basic-info" className="border-b border-gray-200 dark:border-gray-800">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-sm">1</span>
            Basic Information
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <BasicInfoSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 2: Amenities */}
      <AccordionItem value="amenities" className="border-b border-gray-200 dark:border-gray-800">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-sm">2</span>
            Amenities
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <AmenitiesSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 3: Room Types */}
      <AccordionItem value="room-types" className="border-b border-gray-200 dark:border-gray-800">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-sm">3</span>
            Room Types
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <RoomTypesSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 4: Contact & Social Media */}
      <AccordionItem value="contact" className="border-b border-gray-200 dark:border-gray-800">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-4 text-sm">4</span>
            Contact & Social Media
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ContactSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 5: Extended Features */}
      <AccordionItem value="extended-features" className="border-b border-gray-200 dark:border-gray-800">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-4 text-sm">5</span>
            Extended Features
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ExtendedFeaturesSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 6: Contract & Commercial */}
      <AccordionItem value="contract-commercial" className="border-b border-gray-200 dark:border-gray-800">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-4 text-sm">6</span>
            Contract & Commercial
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card className="border-0 shadow-none mb-4">
            <CardContent className="pt-4">
              <h3 className="text-lg font-medium mb-4">Contract Documents</h3>
              <ContractSection contractDocuments={hotel.contractDocuments} />
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HotelViewAccordion;
