
import React from 'react';
import { Bed, Users, Star, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { RoomType } from '@/models/HotelModel';

interface RoomTypesCardProps {
  roomTypes: RoomType[];
  updatedAt: Date;
}

const RoomTypesCard: React.FC<RoomTypesCardProps> = ({ roomTypes, updatedAt }) => {
  return (
    <motion.div
      custom={2}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.05, // Reduced from 0.1 to 0.05 seconds
            duration: 0.2, // Reduced from 0.3 to 0.2 seconds
            ease: "easeOut"
          }
        })
      }}
    >
      <Card className="border-blue-100 dark:border-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-100 dark:border-blue-900">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Bed className="h-5 w-5 text-violet-500" />
            Room Types
          </CardTitle>
          <CardDescription>
            {roomTypes.length} room type{roomTypes.length !== 1 ? 's' : ''} available
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-50 dark:bg-blue-900/30">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Adults
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Children
                    </div>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      Price
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roomTypes.map((roomType) => (
                  <TableRow key={roomType.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <TableCell className="font-medium text-blue-600 dark:text-blue-400">{roomType.name}</TableCell>
                    <TableCell>{roomType.maxAdults}</TableCell>
                    <TableCell>{roomType.maxChildren}</TableCell>
                    <TableCell className="max-w-xs truncate">{roomType.description || '-'}</TableCell>
                    <TableCell>
                      {roomType.price ? (
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
                          ${roomType.price.toFixed(2)}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900/50 p-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          Last updated: {format(new Date(updatedAt), 'PPP')}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RoomTypesCard;
