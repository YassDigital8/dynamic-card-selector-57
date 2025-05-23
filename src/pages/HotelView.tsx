
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import HotelLoadingIndicator from '@/components/hotel/HotelLoadingIndicator';
import { useToast } from '@/hooks/use-toast';
import { useHotelNetwork } from '@/hooks/hotel/useHotelNetwork';
import { HotelViewHeader, HotelViewAccordion, ErrorState } from '@/components/hotel/view';
import { Building, Hotel } from 'lucide-react';
import StandardLayout from '@/components/layout/StandardLayout';
import { motion } from 'framer-motion';

const HotelView = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { toast } = useToast();
  const { allHotels } = useHotelNetwork();
  
  // Create a stable queryKey that doesn't change on every render
  const queryKey = useMemo(() => ['hotel', hotelId], [hotelId]);
  
  // Fixed query to prevent infinite re-renders by using a stable query key
  const { data: hotel, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => {
      const foundHotel = allHotels.find(hotel => hotel.id === hotelId);
      if (!foundHotel) {
        throw new Error('Hotel not found');
      }
      return foundHotel;
    },
    enabled: !!hotelId && !!allHotels.length,
  });
  
  // Memoize animation variants to prevent re-renders
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  }), []);
  
  if (isLoading) {
    return (
      <StandardLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>Hotel Network</span>
            <span className="mx-1">/</span>
            <span>Loading...</span>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg">
            <HotelLoadingIndicator />
          </div>
        </div>
      </StandardLayout>
    );
  }
  
  if (!hotel) {
    return (
      <StandardLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>Hotel Network</span>
            <span className="mx-1">/</span>
            <span>Hotel Not Found</span>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg">
            <ErrorState />
          </div>
        </div>
      </StandardLayout>
    );
  }
  
  return (
    <StandardLayout>
      <motion.div 
        className="container mx-auto py-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <Link to="/hotel" className="hover:text-primary transition-colors">Hotel Network</Link>
            <span className="mx-1">/</span>
            <Hotel className="h-4 w-4" />
            <span>{hotel.name || 'Hotel Details'}</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <HotelViewHeader hotel={hotel} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
          <HotelViewAccordion hotel={hotel} />
        </motion.div>
      </motion.div>
    </StandardLayout>
  );
};

export default HotelView;
