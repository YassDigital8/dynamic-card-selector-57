
import React from 'react';
import { motion } from 'framer-motion';
import { BasicInformation, AmenitiesSection, RoomTypesSection } from './';
import { ContactDetailsSection } from './contact';
import { ContractDocumentSection } from './contract';
import ExtendedFeaturesSection from './ExtendedFeaturesSection';
import { PaymentMethodsSection, BankDetailsSection } from './payment';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './formSchema';

interface FormSectionsProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

const FormSections: React.FC<FormSectionsProps> = ({ form, hotelId }) => {
  // Animation variants for staggered section loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <BasicInformation form={form} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <AmenitiesSection form={form} hotelId={hotelId} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <RoomTypesSection form={form} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ContactDetailsSection />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ExtendedFeaturesSection />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ContractDocumentSection />
      </motion.div>
    </motion.div>
  );
};

export default FormSections;
