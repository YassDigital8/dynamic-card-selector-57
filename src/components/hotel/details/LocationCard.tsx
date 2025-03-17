
import React from 'react';
import { Flag, Building, MapPin, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      custom={0}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.3,
            ease: "easeOut"
          }
        })
      }}
    >
      <Card className="border-blue-100 dark:border-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-100 dark:border-blue-900">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <MapPin className="h-5 w-5 text-blue-500" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-blue-50 dark:border-blue-900">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Flag className="h-4 w-4" />
                Country
              </p>
              <p className="text-muted-foreground">{country}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-blue-50 dark:border-blue-900">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Building className="h-4 w-4" />
                Governorate/State
              </p>
              <p className="text-muted-foreground">{governorate}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-blue-50 dark:border-blue-900">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Street Address
              </p>
              <p className="text-muted-foreground">{streetAddress}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-blue-50 dark:border-blue-900">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Globe className="h-4 w-4" />
                POS Region
              </p>
              <p className="text-muted-foreground flex items-center gap-1">
                <Badge className="uppercase">{posKey}</Badge>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LocationCard;
