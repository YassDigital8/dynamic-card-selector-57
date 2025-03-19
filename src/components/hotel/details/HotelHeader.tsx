
import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, ArrowLeft, MapPin, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';

interface HotelHeaderProps {
  name: string;
  posKey: string;
  country: string;
  governorate: string;
  onEdit: () => void;
  onBack?: () => void;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({
  name,
  posKey,
  country,
  governorate,
  onEdit,
  onBack
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex flex-col space-y-${isMobile ? '3' : '4'}`}>
      <BreadcrumbNav 
        items={[
          { label: 'Dashboard', href: '/' },
          { label: 'Hotel Network', href: '/hotel' },
          { label: posKey.toUpperCase(), href: `/hotel?pos=${posKey.toLowerCase()}` },
          { label: name }
        ]}
      />
      
      <div className="flex items-start justify-between">
        <div className={`flex flex-col space-y-${isMobile ? '1' : '2'}`}>          
          <motion.div 
            layoutId={`hotel-title-${posKey}`}
            className="flex items-center gap-2"
          >
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-indigo-700 dark:text-indigo-300`}>{name}</h1>
          </motion.div>
          
          <motion.div 
            className="text-base text-gray-600 dark:text-gray-400"
            layoutId={`hotel-country-${posKey}`}
          >
            {country}
          </motion.div>
          
          <div className="flex items-center mt-2 text-sm">
            <Flag className="mr-1.5 h-4 w-4 text-indigo-500" />
            <span className="text-indigo-600 dark:text-indigo-400">{posKey}</span>
            <span className="mx-2 text-gray-400">•</span>
            <MapPin className="mr-1.5 h-4 w-4 text-pink-500" />
            <span className="text-gray-600 dark:text-gray-400">{governorate}</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.2
          }}
        >
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={onEdit}
            className="group border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            type="button"
          >
            <Pencil className="mr-2 h-4 w-4 text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">Edit Hotel</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HotelHeader;
