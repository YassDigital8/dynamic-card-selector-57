
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface LocationCardProps {
  country: string;
  governorate: string;
  streetAddress: string;
  posKey: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ 
  country, 
  governorate, 
  streetAddress,
  posKey
}) => {
  // Staggered animation for location card elements
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
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
      custom={0}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
            mass: 0.8,
            delay: 0.05
          }
        }
      }}
    >
      <Card className="border-blue-100 dark:border-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-100 dark:border-blue-900">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <MapPin className="h-5 w-5 text-blue-500" />
            </motion.div>
            Location Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item} layoutId={`hotel-address-${posKey}`} className="text-base">
              <div className="font-medium text-blue-700 dark:text-blue-400 mb-1.5">Address</div>
              <div className="text-gray-600 dark:text-gray-300 text-base">{streetAddress}</div>
            </motion.div>
            
            <motion.div variants={item} className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-blue-700 dark:text-blue-400 mb-1.5">Country</div>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="text-gray-600 dark:text-gray-300 cursor-help text-base font-medium">{country}</div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{country}</h4>
                        <p className="text-sm">
                          View all hotels in {country}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              
              <div>
                <div className="font-medium text-blue-700 dark:text-blue-400 mb-1.5">Governorate</div>
                <div className="text-gray-600 dark:text-gray-300 text-base font-medium">{governorate}</div>
              </div>
            </motion.div>
            
            <motion.div
              variants={item}
              className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-lg text-sm text-blue-700 dark:text-blue-300"
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                <span>This hotel belongs to the <strong className="text-base uppercase">{posKey}</strong> point of sale.</span>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LocationCard;
