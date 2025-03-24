
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel } from '@/models/HotelModel';
import BasicInfoSection from './sections/BasicInfoSection';
import AmenitiesSection from './sections/AmenitiesSection';
import RoomTypesSection from './sections/RoomTypesSection';
import ContactSection from './sections/ContactSection';
import ExtendedFeaturesSection from './sections/ExtendedFeaturesSection';
import ContractSection from './sections/ContractSection';
import { motion } from 'framer-motion';
import { Building, Utensils, Bed, Phone, Settings, FileText } from 'lucide-react';

interface HotelViewAccordionProps {
  hotel: Hotel;
}

const HotelViewAccordion: React.FC<HotelViewAccordionProps> = ({ hotel }) => {
  const [activeItem, setActiveItem] = useState<string>("basic-info");
  
  const getIconColor = (itemValue: string) => {
    return activeItem === itemValue 
      ? "text-white" 
      : "text-indigo-500 dark:text-indigo-400";
  };
  
  const getBackgroundColor = (itemValue: string) => {
    return activeItem === itemValue 
      ? "bg-indigo-600" 
      : "bg-indigo-100 dark:bg-indigo-900/30";
  };
  
  return (
    <Accordion 
      type="single" 
      collapsible 
      value={activeItem}
      onValueChange={setActiveItem}
      className="w-full"
    >
      {/* Step 1: Basic Information */}
      <AccordionItem value="basic-info" className="border-b border-indigo-100 dark:border-indigo-800/50 overflow-hidden rounded-t-lg">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4 py-4 transition-all">
          <div className="flex items-center">
            <motion.div 
              className={`w-10 h-10 rounded-full ${getBackgroundColor('basic-info')} flex items-center justify-center mr-4 transition-colors duration-300`}
              animate={{ scale: activeItem === 'basic-info' ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Building className={`h-5 w-5 ${getIconColor('basic-info')}`} />
            </motion.div>
            <span className="text-indigo-700 dark:text-indigo-300">Basic Information</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <BasicInfoSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 2: Amenities */}
      <AccordionItem value="amenities" className="border-b border-indigo-100 dark:border-indigo-800/50">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4 py-4 transition-all">
          <div className="flex items-center">
            <motion.div 
              className={`w-10 h-10 rounded-full ${getBackgroundColor('amenities')} flex items-center justify-center mr-4 transition-colors duration-300`}
              animate={{ scale: activeItem === 'amenities' ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Utensils className={`h-5 w-5 ${getIconColor('amenities')}`} />
            </motion.div>
            <span className="text-indigo-700 dark:text-indigo-300">Amenities</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <AmenitiesSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 3: Room Types */}
      <AccordionItem value="room-types" className="border-b border-indigo-100 dark:border-indigo-800/50">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4 py-4 transition-all">
          <div className="flex items-center">
            <motion.div 
              className={`w-10 h-10 rounded-full ${getBackgroundColor('room-types')} flex items-center justify-center mr-4 transition-colors duration-300`}
              animate={{ scale: activeItem === 'room-types' ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Bed className={`h-5 w-5 ${getIconColor('room-types')}`} />
            </motion.div>
            <span className="text-indigo-700 dark:text-indigo-300">Room Types</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <RoomTypesSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 4: Contact & Social Media */}
      <AccordionItem value="contact" className="border-b border-indigo-100 dark:border-indigo-800/50">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4 py-4 transition-all">
          <div className="flex items-center">
            <motion.div 
              className={`w-10 h-10 rounded-full ${getBackgroundColor('contact')} flex items-center justify-center mr-4 transition-colors duration-300`}
              animate={{ scale: activeItem === 'contact' ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Phone className={`h-5 w-5 ${getIconColor('contact')}`} />
            </motion.div>
            <span className="text-indigo-700 dark:text-indigo-300">Contact & Social Media</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <ContactSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 5: Extended Features */}
      <AccordionItem value="extended-features" className="border-b border-indigo-100 dark:border-indigo-800/50">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4 py-4 transition-all">
          <div className="flex items-center">
            <motion.div 
              className={`w-10 h-10 rounded-full ${getBackgroundColor('extended-features')} flex items-center justify-center mr-4 transition-colors duration-300`}
              animate={{ scale: activeItem === 'extended-features' ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Settings className={`h-5 w-5 ${getIconColor('extended-features')}`} />
            </motion.div>
            <span className="text-indigo-700 dark:text-indigo-300">Extended Features</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <ExtendedFeaturesSection hotel={hotel} />
        </AccordionContent>
      </AccordionItem>

      {/* Step 6: Contract & Commercial */}
      <AccordionItem value="contract-commercial" className="border-b border-indigo-100 dark:border-indigo-800/50 rounded-b-lg">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4 py-4 transition-all">
          <div className="flex items-center">
            <motion.div 
              className={`w-10 h-10 rounded-full ${getBackgroundColor('contract-commercial')} flex items-center justify-center mr-4 transition-colors duration-300`}
              animate={{ scale: activeItem === 'contract-commercial' ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FileText className={`h-5 w-5 ${getIconColor('contract-commercial')}`} />
            </motion.div>
            <span className="text-indigo-700 dark:text-indigo-300">Contract & Commercial</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <Card className="border-0 shadow-none mb-4">
            <CardContent className="pt-4">
              <h3 className="text-lg font-medium mb-4 text-indigo-700 dark:text-indigo-300">Contract Documents</h3>
              <ContractSection contractDocuments={hotel.contractDocuments} />
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HotelViewAccordion;
