
import React from 'react';
import { Pencil, Trash2, MapPin, Flag, Users, Hotel as HotelIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel, HotelAmenities } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AmenityIcon from './AmenityIcon';

interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  useGridView?: boolean;
}

// Function to get a consistent avatar image based on hotel name
const getHotelAvatar = (hotelName: string): string => {
  // Use a modulo operation to cycle through 5 placeholder images
  const nameHash = hotelName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageIndex = nameHash % 5 + 1;
  
  const placeholderImages = [
    'photo-1460925895917-afdab827c52f',
    'photo-1487958449943-2429e8be8625',
    'photo-1449157291145-7efd050a4d0e',
    'photo-1459767129954-1b1c1f9b9ace',
    'photo-1496307653780-42ee777d4833'
  ];
  
  return `https://images.unsplash.com/${placeholderImages[imageIndex - 1]}?auto=format&fit=crop&w=300&h=150&q=80`;
};

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  useGridView = false
}) => {
  // Enhanced card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.4
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    selected: {
      boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.6), 0 10px 20px rgba(79, 70, 229, 0.1)",
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={isSelected ? undefined : "hover"}
      whileTap="tap"
      animate={isSelected ? "selected" : "show"}
      initial="hidden"
      className="cursor-pointer"
      onClick={onSelect}
      layout
    >
      <Card 
        className={`h-full transition-all duration-200 ${
          isSelected 
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40' 
          : 'hover:border-indigo-200 dark:hover:border-indigo-800'
        }`}
      >
        <CardHeader className={`pb-2 ${useGridView ? 'p-3' : ''}`}>
          <div className={`${useGridView ? 'flex flex-col' : 'flex items-center space-x-3'}`}>
            <motion.div 
              className={`${useGridView ? 'w-full h-32 mb-3 overflow-hidden rounded-lg' : 'h-12 w-12'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  delay: 0.1,
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: {
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
            >
              {useGridView ? (
                <img 
                  src={getHotelAvatar(hotel.name)} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/300x150/indigo/white?text=Hotel';
                  }}
                />
              ) : (
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={getHotelAvatar(hotel.name)} alt={hotel.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700">
                    <HotelIcon className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
            <div className="flex-1">
              <CardTitle className={`${useGridView ? 'text-base' : 'text-lg'} text-indigo-700 dark:text-indigo-300`}>
                {hotel.name}
              </CardTitle>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: 0.2,
                    duration: 0.3
                  }
                }}
              >
                <Badge variant="outline" className="uppercase text-xs bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                  {hotel.posKey}
                </Badge>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent className={`space-y-3 ${useGridView ? 'p-3 pt-0' : ''}`}>
          <motion.div 
            className="flex items-center text-sm text-muted-foreground"
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: {
                delay: 0.25,
                duration: 0.3
              }
            }}
          >
            <Flag className="mr-1 h-3.5 w-3.5 text-indigo-500" />
            <span>{hotel.country}</span>
            <span className="px-1">•</span>
            <span>{hotel.governorate}</span>
          </motion.div>
          <motion.div 
            className="flex items-center text-sm text-muted-foreground"
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: {
                delay: 0.3,
                duration: 0.3
              }
            }}
          >
            <MapPin className="mr-1 h-3.5 w-3.5 text-pink-500" />
            <span className="truncate">{hotel.streetAddress}</span>
          </motion.div>
          
          {!useGridView && (
            <motion.div 
              className="flex flex-wrap gap-1.5 bg-white/70 dark:bg-slate-800/50 p-2 rounded-md border border-indigo-50 dark:border-indigo-900/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.35,
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
            >
              {(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>)
                .filter(amenity => hotel.amenities[amenity])
                .slice(0, 6) // Show only top 6 amenities to keep card clean
                .map((amenity, index) => (
                  <motion.div
                    key={amenity}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        delay: 0.4 + (index * 0.05),
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                  >
                    <AmenityIcon amenity={amenity} value={hotel.amenities[amenity]} />
                  </motion.div>
                ))}
              {(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>)
                .filter(amenity => hotel.amenities[amenity]).length > 6 && (
                <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium text-xs">
                  +{(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>)
                    .filter(amenity => hotel.amenities[amenity]).length - 6} more
                </Badge>
              )}
            </motion.div>
          )}
          
          <motion.div 
            className="pt-2 flex justify-between items-center border-t border-indigo-100 dark:border-indigo-900/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                delay: 0.45,
                duration: 0.3,
                ease: "easeOut"
              }
            }}
          >
            <div className="flex items-center text-sm">
              <Users className="mr-1 h-3.5 w-3.5 text-indigo-500" />
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                {hotel.roomTypes.length} room type{hotel.roomTypes.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex gap-2">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HotelCard;
